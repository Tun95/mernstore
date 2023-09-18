import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs";
import path, { dirname, join } from "path";
import unzipper from "unzipper";
import { fileURLToPath } from "url";
import fsExtra from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const updateRouter = express.Router();

updateRouter.use(fileUpload());

// Function to read the installation path from the update zip
function readUpdateInfoFromZip(extractPath) {
  const configPath = path.join(extractPath, "update-config.json");

  return fs.existsSync(configPath)
    ? JSON.parse(fs.readFileSync(configPath, "utf-8"))
    : null;
}

// Function to copy or update files and folders recursively
function copyOrUpdateFiles(sourceFolder, targetFolder) {
  try {
    const items = fs.readdirSync(sourceFolder);

    for (const item of items) {
      const sourceItemPath = path.join(sourceFolder, item);
      const targetItemPath = path.join(targetFolder, item);

      const stats = fs.statSync(sourceItemPath);

      if (stats.isDirectory()) {
        // Create the target directory if it doesn't exist
        if (!fs.existsSync(targetItemPath)) {
          fs.mkdirSync(targetItemPath);
        }
        // Recursively copy/update subdirectories and files
        copyOrUpdateFiles(sourceItemPath, targetItemPath);
      } else {
        // Copy/update individual files
        if (!fs.existsSync(targetItemPath)) {
          fs.copyFileSync(sourceItemPath, targetItemPath);
        } else {
          // Update the file if it already exists in the target folder
          const sourceFileContent = fs.readFileSync(sourceItemPath, "utf-8");
          fs.writeFileSync(targetItemPath, sourceFileContent);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error copying or updating files:", error);
    return false;
  }
}

// Function to remove a directory and its contents recursively
async function removeDirectoryRecursive(directoryPath) {
  try {
    await fsExtra.remove(directoryPath);
    return true;
  } catch (error) {
    console.error(`Error removing directory '${directoryPath}':`, error);
    return false;
  }
}

// ====================
// UPDATE FILE HANDLER
// ====================
updateRouter.post("/apply-update", async (req, res) => {
  if (!req.files || !req.files.updateZip) {
    return res.status(400).send("No update file was uploaded.");
  }

  const updateZipFile = req.files.updateZip;
  const uploadPath = path.join(__dirname, "uploads");
  const extractPath = path.join(__dirname, "extracted-updates");

  fs.mkdirSync(uploadPath, { recursive: true });
  fs.mkdirSync(extractPath, { recursive: true });

  try {
    await updateZipFile.mv(path.join(uploadPath, updateZipFile.name));

    fs.createReadStream(path.join(uploadPath, updateZipFile.name))
      .pipe(unzipper.Extract({ path: extractPath }))
      .on("close", async () => {
        const updateInfo = readUpdateInfoFromZip(extractPath);

        if (!updateInfo || !updateInfo.installPath || !updateInfo.type) {
          return res.status(400).send("Invalid update file.");
        }

        const isFrontendUpdate = updateInfo.type === "frontend";
        const baseDirectory = isFrontendUpdate ? "frontend" : "backend";

        const targetFolder = path.join(
          __dirname,
          "..", // Move up one directory (to "backend" or "frontend")
          "..", // Move up one more directory (to "MernStore")
          baseDirectory,
          updateInfo.installPath
        );
        console.log("updateInfo:", updateInfo);
        console.log("targetFolder:", targetFolder);

        if (!fs.existsSync(targetFolder)) {
          return res.status(400).send("Target folder does not exist.");
        }

        // Copy or update files and folders from the extracted update to the target folder
        const success = copyOrUpdateFiles(
          path.join(extractPath, baseDirectory, updateInfo.installPath),
          targetFolder
        );

        if (success) {
          // Remove temporary folders and their contents recursively
          const removeUploads = await removeDirectoryRecursive(uploadPath);
          const removeExtractedUpdates = await removeDirectoryRecursive(
            extractPath
          );

          if (removeUploads && removeExtractedUpdates) {
            // Optionally, remove the parent directory as well
            const removeParentDirectory = await removeDirectoryRecursive(
              path.dirname(extractPath)
            );

            if (removeParentDirectory) {
              res.send("Update applied successfully.");
            } else {
              res.status(500).send("Error cleaning up parent directory.");
            }
          } else {
            res.status(500).send("Error cleaning up temporary folders.");
          }
        } else {
          res.status(500).send("Error applying the update.");
        }
      });
  } catch (err) {
    console.error("Error processing the update:", err);
    res.status(500).send("Error applying the update.");
  }
});

export default updateRouter;
