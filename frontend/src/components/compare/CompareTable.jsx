import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function CompareTable() {
  return (
    <div className="compare_table">
      <table className="table">
        <tbody>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <span className="a_flex">
                <strong className="compare_sort_title">Batteries:</strong>

                <CloseOutlinedIcon className="icon" />
              </span>
            </td>

            <td className="compare_feature_item feature_item_size">
              1 Lithium ion batteries required. (included)
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort ">
              <span className="a_flex">
                <strong className="compare_sort_title">Brand Name:</strong>
                <CloseOutlinedIcon className="icon" />
              </span>
            </td>
            <td className="compare_feature_item feature_item_size">Apple</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort ">
              <span className="a_flex">
                <strong className="compare_sort_title">Color:</strong>

                <CloseOutlinedIcon className="icon" />
              </span>
            </td>
            <td className="compare_feature_item feature_item_size">Gray</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort ">
              <span className="a_flex">
                <strong className="compare_sort_title">Hard Drive:</strong>

                <CloseOutlinedIcon className="icon" />
              </span>
            </td>
            <td className="compare_feature_item feature_item_size">128 GB</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort ">
              <span className="a_flex">
                <strong className="compare_sort_title">RAM:</strong>

                <CloseOutlinedIcon className="icon" />
              </span>
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">6GB</td>
            <td className="compare_feature_item feature_item_size">12GB</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort ">
              <span className="a_flex">
                <strong className="compare_sort_title">Screen diagonal:</strong>

                <CloseOutlinedIcon className="icon" />
              </span>
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">6.1"</td>
            <td className="compare_feature_item feature_item_size">6.7"</td>
            <td className="compare_feature_item feature_item_size">13.6"</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort ">
              <span className="a_flex">
                <strong className="compare_sort_title">RAM:</strong>

                <CloseOutlinedIcon className="icon" />
              </span>
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">8GB</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort ">
              <span className="a_flex">
                <strong className="compare_sort_title">SSD:</strong>

                <CloseOutlinedIcon className="icon" />
              </span>
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">256GB</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompareTable;
