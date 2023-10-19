import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function CompareTable() {
  return (
    <div className="compare_table">
      <table className="table">
        <tbody>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">Batteries:</strong>
              <Link to="" title="Remove"></Link>
            </td>
						
            <td className="compare_feature_item feature_item_size">
              1 Lithium ion batteries required. (included)
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">Brand Name:</strong>
              <Link to="" title="Remove"></Link>
            </td>
            <td className="compare_feature_item feature_item_size">Apple</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">Color:</strong>
              <Link to="" title="Remove"></Link>
            </td>
            <td className="compare_feature_item feature_item_size">Gray</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">Hard Drive:</strong>
              <Link
                to=""
                href="https://electronics.mv.unitheme.net/index.php?dispatch=product_features.delete_feature&amp;feature_id=39&amp;redirect_url=index.php%3Fdispatch%3Dproduct_features.compare.show_all"
                title="Remove"
              ></Link>
            </td>
            <td className="compare_feature_item feature_item_size">128 GB</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">RAM:</strong>
              <Link
                to=""
                href="https://electronics.mv.unitheme.net/index.php?dispatch=product_features.delete_feature&amp;feature_id=80&amp;redirect_url=index.php%3Fdispatch%3Dproduct_features.compare.show_all"
                title="Remove"
              ></Link>
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">6GB</td>
            <td className="compare_feature_item feature_item_size">12GB</td>
            <td className="compare_feature_item feature_item_size">-</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">Screen diagonal:</strong>
              <Link
                to=""
                href="https://electronics.mv.unitheme.net/index.php?dispatch=product_features.delete_feature&amp;feature_id=83&amp;redirect_url=index.php%3Fdispatch%3Dproduct_features.compare.show_all"
                title="Remove"
              ></Link>
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">6.1"</td>
            <td className="compare_feature_item feature_item_size">6.7"</td>
            <td className="compare_feature_item feature_item_size">13.6"</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">RAM:</strong>
              <Link
                to=""
                href="https://electronics.mv.unitheme.net/index.php?dispatch=product_features.delete_feature&amp;feature_id=84&amp;redirect_url=index.php%3Fdispatch%3Dproduct_features.compare.show_all"
                title="Remove"
              ></Link>
            </td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">-</td>
            <td className="compare_feature_item feature_item_size">8GB</td>
          </tr>
          <tr className="compare_feature_row">
            <td className="compare_feature_item compare_sort">
              <strong className="compare_sort_title">SSD:</strong>
              <Link
                to=""
                href="https://electronics.mv.unitheme.net/index.php?dispatch=product_features.delete_feature&amp;feature_id=85&amp;redirect_url=index.php%3Fdispatch%3Dproduct_features.compare.show_all"
                title="Remove"
              ></Link>
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
