import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import ReactGA from "react-ga4";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlayComponent from "./components/utilities/message loading/OverlayLoading";
import "mapbox-gl/dist/mapbox-gl.css";

import Header from "./common/header/Header";
import HomeScreen from "./screens/homescreen/HomeScreen";
import StoreScreen from "./screens/storescreen/StoreScreen";
import ProductDetailScreen from "./screens/productdetailscreen/ProductDetailScreen";
import WishlistScreen from "./screens/wishlistscreen/WishlistScreen";
import UserProfileScreen from "./screens/profilescreen/user profile/UserProfileScreen";
import VendorProfileScreen from "./screens/profilescreen/vendor profile/VendorProfileScreen";
import LoginScreen from "./screens/formscreens/loginscreen/LoginScreen";
import RegisterScreen from "./screens/formscreens/registerscreen/RegisterScreen";
import ContactScreen from "./screens/formscreens/contactscreen/ContactScreen";
import AccountVerifyScreen from "./screens/formscreens/accountverifyscreen/AccountVerifyScreen";
import VerifySuccessScreen from "./screens/formscreens/verifiedscreen/VerifiedScreen";
import UserList from "./admin/pages/list/user/UserList";
import VendorList from "./admin/pages/list/vendor/VendorList";
import Footer from "./common/footer/Footer";
import ProductEdit from "./admin/pages/edit/product/ProductEdit";
import UserEdit from "./admin/pages/edit/user/UserEdit";
import UserInfo from "./admin/pages/single/user/UserInfo";
import NewProduct from "./admin/pages/new/product/NewProduct";
import OurStoreScreen from "./screens/aboutscreen/ourstorescreen/OurStoreScreen";
import PrivacyScreen from "./screens/aboutscreen/privacyscreen/PrivacyScreen";
import TermScreen from "./screens/aboutscreen/termscreen/TermScreen";
import ScrollToTop from "./components/utilities/scroll to top/ScrollToTop";
import { Context } from "./context/Context";

import ProtectedRoute from "./components/utilities/protectedRoute/ProtectedRoute";
import AdminRoute from "./components/utilities/protectedRoute/AdminRoute";

import OtherScreen from "./admin/pages/others/others/Others";
import PasswordEmailResetScreen from "./screens/formscreens/passemailcreen/PasswordEmailResetScreen";
import PasswordResetFormScreen from "./screens/formscreens/passresetformscreen/PasswordResetFormScreen";
import CareerScreen from "./screens/aboutscreen/careerscreen/CareerScreen";
import OurCareScreen from "./screens/aboutscreen/ourcarescreen/OurCareScreen";
import BulkScreen from "./screens/customercarescreen/bulkscreen/BulkScreen";
import BuyInfoScreen from "./screens/customercarescreen/buyinfoscreen/BuyInfoScreen";
import ReturnScreen from "./screens/customercarescreen/returnscreen/ReturnScreen";
import OrderHistoryScreen from "./screens/orderscreen/orderhistoryscren/OrderHistoryScreen";
import OrderDetailScreen from "./screens/orderscreen/orderdetailscreen/OrderDetailScreen";
import OrderlistScreen from "./admin/pages/list/order/main/OrderlistScreen";
import SellerRoute from "./components/utilities/protectedRoute/SellerRoute";
import ProductlistScreen from "./admin/pages/list/product/main/ProductListScreen";
import DashboardScreen from "./admin/pages/home/main/DashboardScreen";
import VendorScreen from "./screens/formscreens/vendorscreen/VendorScreen";
import Application from "./admin/pages/single/application detail/Application";
import TrackScreen from "./screens/orderscreen/trackscreen/TrackScreen";

import NotFoundScreen from "./components/utilities/404 error/PageNotFound";
import ThemeFaqScreen from "./screens/aboutscreen/faqscreen/ThemeFaqScreen";
import SellerProductEdit from "./seller/pages/edit/SellerProductEdit";
import SellerNewProduct from "./seller/pages/new/product/SellerNewProduct";
import SellerDashboard from "./seller/pages/dashboard/Dashboard";
import UnSubscribeScreen from "./screens/formscreens/unsubscribescreen/UnsubcribeScreen";
import Withdrawal from "./admin/pages/single/withdrawal request/Withdrawal";
import SellerWithdraw from "./seller/pages/single/withrawal request/SellerWithdraw";
import SellerProductListScreen from "./seller/pages/list/product/SellerProductList";
import SellerOrderListScreen from "./seller/pages/list/order/SellerOrderList";
import VendorListScreen from "./seller/pages/list/vendors/VendorListScreen";
import CompanyViewScreen from "./seller/pages/single/company view/CompanyView";
import BlogDetailScreen from "./screens/blogdetailscreen/BlogDetailscreen";
import VendorPlanScreen from "./seller/pages/single/vendors plan/VendorPlanScreen";
import BlogPostListScreen from "./screens/bloglistscreen/BlogPostListScreen";
import ComparisonScreen from "./screens/comparisonscreen/ComparisonScreen";
import CartScreen from "./screens/cartscreen/CartScreen";
import VendorProductScreen from "./seller/pages/single/vendor/VendorScreen";
import PromotionListScreen from "./screens/promotionscreen/promotionlist/PromotionListScreen";
import PromotionDetailScreen from "./screens/promotionscreen/promotiondetails/PromotionDetailScreen";
import CheckoutScreen from "./screens/checkoutscreen/CheckoutScreen";
import Filters from "./admin/pages/single/filters/Filters";
import { Banner } from "./admin/pages/new/banner/Banner";
import { Promotion } from "./admin/pages/new/promotion/Promotion";
import { BlogCreateUpdate } from "./admin/pages/new/blog/BlogCreateUpdate";
import VerifyOtpScreen from "./screens/formscreens/verifyloginscreen/VerifyOtpScreen";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  const { state, dispatch } = useContext(Context);
  const { settings } = state;
  const {
    messengerAppId,
    messengerPageId,
    shortDesc,
    faviconUrl,
    webname,
    paypal,
  } =
    (settings &&
      settings
        .map((s) => ({
          paypal: s.paypal,
          messengerAppId: s.messengerAppId,
          messengerPageId: s.messengerPageId,
          faviconUrl: s.faviconUrl,
          webname: s.webname,
          shortDesc: s.shortDesc,
        }))
        .find(() => true)) ||
    {};

  // // Somewhere in your authentication logic
  // const handleTokenExpiration = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const expirationTime = decodeToken(token).exp;

  //     if (expirationTime && expirationTime < Date.now() / 1000) {
  //       dispatch({ type: "TOKEN_EXPIRED" });
  //       // Optionally, you can perform other actions like redirecting the user to the login page.
  //     }
  //   }
  // };
  // // Utility function to decode JWT token
  // const decodeToken = (token) => {
  //   try {
  //     return jwt.decode(token);
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     return null;
  //   }
  // };

  // Set the appShortDesc as a global variable
  window.appShortDesc = shortDesc || "My web app";

  useEffect(() => {
    // Update the favicon dynamically
    const updateFavicon = () => {
      document.querySelector("link[rel='icon']").href = faviconUrl;
      document.querySelector("link[rel='apple-touch-icon']").href = faviconUrl;
    };

    updateFavicon(); // Call the function to update favicon

    // Set the description dynamically using window.appShortDesc
    const metaDescriptionTag = document.querySelector(
      "meta[name='description']"
    );
    if (metaDescriptionTag) {
      metaDescriptionTag.content = window.appShortDesc || "My web app";
    }
  }, [faviconUrl]);

  //============================
  // Set the PayPal client ID on the window object
  //============================
  useEffect(() => {
    window.paypalClientId = paypal;
  }, [paypal]);

  ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING, {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123,
    },
  });

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <div className="app">
      <Router>
        {/* <LoadingOverlayComponent center> */}
        <ToastContainer position="bottom-center" />
        <ScrollToTop />
        <Header />
        <div className="overflow">
          <Routes>
            <Route path="*" element={<NotFoundScreen />} />
            <Route path="/" exact element={<HomeScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/store" element={<StoreScreen />}></Route>
            <Route
              path="/product/:slug"
              element={<ProductDetailScreen />}
            ></Route>
            <Route
              path="/order-details/:id"
              element={<OrderDetailScreen />}
            ></Route>

            {/* VENDOR */}
            <Route
              path="/vendor-products/:id"
              element={<VendorProductScreen />}
            ></Route>
            <Route path="/vendors" element={<VendorListScreen />}></Route>
            <Route
              path="/vendors/:slug"
              element={<CompanyViewScreen />}
            ></Route>
            <Route path="/vendors-plan" element={<VendorPlanScreen />}></Route>
            {/* VENDOR */}

            <Route path="/store-locations" element={<OurStoreScreen />}></Route>
            <Route path="/privacy-policy" element={<PrivacyScreen />}></Route>
            <Route path="/terms-and-conditons" element={<TermScreen />}></Route>
            <Route path="/careers" element={<CareerScreen />}></Route>
            <Route path="/our-cares" element={<OurCareScreen />}></Route>
            <Route path="/theme-faq" element={<ThemeFaqScreen />}></Route>

            <Route path="/bulk-purchases" element={<BulkScreen />}></Route>
            <Route path="/how-to-buy" element={<BuyInfoScreen />}></Route>
            <Route path="/returns" element={<ReturnScreen />}></Route>

            {/* BLOG */}
            <Route path="/blog" element={<BlogPostListScreen />}></Route>
            <Route
              path="/blog-detail/:slug"
              element={<BlogDetailScreen />}
            ></Route>
            {/* BLOG */}

            {/* PROMOTION */}
            <Route path="/promotions" element={<PromotionListScreen />}></Route>
            <Route
              path="/promotions/:slug"
              element={<PromotionDetailScreen />}
            ></Route>
            {/* PROMOTION */}

            {/* USER */}
            <Route
              path="/user-profile/:id"
              element={
                <ProtectedRoute>
                  <UserProfileScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/vendor-profile/:id"
              element={
                <ProtectedRoute>
                  <VendorProfileScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/wish-list" element={<WishlistScreen />}></Route>
            <Route path="/compare" element={<ComparisonScreen />}></Route>
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/track-shipment"
              element={
                <ProtectedRoute>
                  <TrackScreen />
                </ProtectedRoute>
              }
            ></Route>
            {/* USER */}

            {/* VALIDATION */}
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/contact" element={<ContactScreen />}></Route>
            <Route
              path="/forgot-password"
              element={<PasswordEmailResetScreen />}
            ></Route>
            <Route
              path="/:id/new-password/:token"
              element={<PasswordResetFormScreen />}
            ></Route>
            <Route
              path="/account-verification"
              element={<AccountVerifyScreen />}
            ></Route>
            <Route
              path="/otp-verification"
              element={<VerifyOtpScreen />}
            ></Route>
            <Route
              path="/apply-for-vendor"
              element={
                // <ProtectedRoute>
                <VendorScreen />
                // </ProtectedRoute>
              }
            ></Route>
            <Route path="/unsubscribe" element={<UnSubscribeScreen />}></Route>
            {/* VALIDATION */}

            {/* CHECKOUT */}
            <Route path="/checkout" element={<CheckoutScreen />}></Route>
            {/* CHECKOUT */}

            {/* ADMIN ROUTES */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserList />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <AdminRoute>
                  <UserInfo />
                </AdminRoute>
              }
            ></Route>

            <Route
              path="/admin/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEdit />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/vendors"
              element={
                <AdminRoute>
                  <VendorList />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductlistScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/new"
              element={
                <AdminRoute>
                  <NewProduct />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id/edit"
              element={
                <AdminRoute>
                  <ProductEdit />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderlistScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/withdrawal-request"
              element={
                <AdminRoute>
                  <Withdrawal />
                </AdminRoute>
              }
            ></Route>

            {/* FILTERS */}
            <Route
              path="/admin/filters"
              element={
                <AdminRoute>
                  <Filters />
                </AdminRoute>
              }
            ></Route>

            {/* BANNER */}
            <Route
              path="/admin/banners"
              element={
                <AdminRoute>
                  <Banner />
                </AdminRoute>
              }
            ></Route>
            {/* BANNER */}

            {/* PROMOTION */}
            <Route
              path="/admin/promotions"
              element={
                <AdminRoute>
                  <Promotion />
                </AdminRoute>
              }
            ></Route>
            {/* PROMOTION */}

            {/* ADMIN BLOG */}
            <Route
              path="/admin/blog"
              element={
                <AdminRoute>
                  <BlogCreateUpdate />
                </AdminRoute>
              }
            ></Route>
            {/* ADMIN BLOG */}

            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <OtherScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/application-details/:id"
              element={
                <AdminRoute>
                  <Application />
                </AdminRoute>
              }
            ></Route>
            {/* ADMIN ROUTES */}

            {/* SELLER ROUTES */}
            <Route
              path="/vendor/dashboard"
              element={
                <SellerRoute>
                  <SellerDashboard />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/products"
              element={
                <SellerRoute>
                  <SellerProductListScreen />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/product/:id/edit"
              element={
                <SellerRoute>
                  <SellerProductEdit />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/product/new"
              element={
                <SellerRoute>
                  <SellerNewProduct />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/orders"
              element={
                <SellerRoute>
                  <SellerOrderListScreen />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/withdraw"
              element={
                <SellerRoute>
                  <SellerWithdraw />
                </SellerRoute>
              }
            ></Route>
          </Routes>
        </div>
        {/* <MessengerCustomerChat
            pageId={messengerPageId}
            appId={messengerAppId}
          /> */}
        <Footer />
        {/* </LoadingOverlayComponent> */}
      </Router>
    </div>
  );
}

export default App;
