import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import AdminUsers from './components/Admin/users/AdminUsers';
import AdminStatistiques from './components/Admin/statistiques/statistique'
import AdminMessages from './components/Admin/messages/AdminMessages';
import CreateUser from './components/Admin/users/Create';
import CreateMessage from './components/Message/CreateMessage';
import Messaging from './components/Message/Messaging';
import EditUser from './components/Admin/users/Edit';
import EditMessage from './components/Admin/messages/Edit';
import Nav from './components/nav'
import Homepage from './components/homepage'
import ProductList from './components/productList'
import Product from './components/product'
import Profile from './components/profile'
import Footer from './components/footer'
import DashboardSeller from './components/dashboardSeller/dashboardSeller'
import CommentsList from './components/Admin/comments/AdminComments';
import MyInfos from './components/dashboardSeller/myInfos'
import MyFavorites from './components/dashboardSeller/myFavorites'
import MyArtworks from './components/dashboardSeller/myArtworks'
import editArtworks from './components/dashboardSeller/editArtworks'
import Register from './components/register'
import Login from './components/login'
import NotFound from './components/404'
import PostArtwork from './components/dashboardSeller/postArtwork'
import Stats from './components/dashboardSeller/stats'
import AdminArtWorks from './components/Admin/artworks/AdminArtWorks'
import Cart from './components/Cart/Cart';
import ConfirmationPurchase from './components/Cart/Confirmation';
//artistList
import artistList from './components/artists/artistList';
import ShowArtist from './components/artists/ShowArtist';

//commentaires
import commentArtist from './components/artists/commentArtist';
import Home from './components/HomePage/Home'
import Confirmation from './components/Cart/Confirmation';


function App() {

  const [superLoggedIn, setMainLoggedIn] = useState(false)
  const [idMain, setIdMain] = useState(localStorage.id)
  const [redirectAfterLogout, setRedirectAfterLogout] = useState(false)
  const [admin, setAdmin] = useState(false)



  const getDashBoardAdmin = () => {
    /* console.log(window.location.pathname) */

    if (window.location.pathname === "/admin-users" || window.location.pathname === "/admin-messages" || window.location.pathname === "/admin-comments" || window.location.pathname === "/admin-artworks" || window.location.pathname === "/message/create" || window.location.pathname === "/message/edit" || window.location.pathname === "/user/create" || window.location.pathname === "/user/edit") {
      /* console.log(window) */
      return "App2";
    } else {

      return "App";
    }
  }

  return (
    <Router>
      <div className={getDashBoardAdmin()}>
        <Nav setMainLoggedIn={setMainLoggedIn}
          setIdMain={setIdMain}
          idMain={idMain}
          setRedirectAfterLogout={setRedirectAfterLogout}
          redirectAfterLogout={redirectAfterLogout}
          setAdmin={setAdmin}
        />
        {redirectAfterLogout && <Redirect to="/" />}
        <Switch>
          <Route path="/admin-artworks" component={AdminArtWorks} />
          <Route path="/profile" exact render={() => <Profile idMain={idMain} />} />
          <Route path="/admin-stats" component={AdminStatistiques} />
          <Route path="/admin-users" component={AdminUsers} />
          <Route path="/user/create" component={CreateUser} />
          <Route path="/user/edit" component={EditUser} />
          <Route path="/admin-messages" component={AdminMessages} />
          <Route path="/messages" component={Messaging} />
          <Route path="/message/create" component={CreateMessage} />
          <Route path="/message/edit" component={EditMessage} />
          <Route path="/admin-comments" component={CommentsList} />
          <Route path="/home" exact render={() => <Homepage setMainLoggedIn={setMainLoggedIn} superLoggedIn={superLoggedIn} />} />
          <Route path="/product_list" component={ProductList} />
          <Route path="/product/:id" render={() => <Product idMain={idMain} />} />
          <Route path="/edit/:id" exact component={editArtworks} />
          <Route path="/seller/artworks/:id" exact render={() => <MyArtworks idMain={idMain} />} />
          <Route path="/seller/post" exact render={() => <PostArtwork idMain={idMain} />} />
          <Route path="/seller/stats/:id" exact render={() => <Stats idMain={idMain} />} />
          <Route path="/seller/infos/:id" exact render={() => <MyInfos idMain={idMain} />} />
          <Route path="/seller/favorites/:id" exact render={() => <MyFavorites idMain={idMain} />} />
          <Route path="/seller/:id" exact render={() => <DashboardSeller idMain={idMain} />} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/confirmation" component={ConfirmationPurchase} />

          <Route path="/commentaireArtist" component={commentArtist} />

          <Route path="/artistList" component={artistList} />
          <Route path={"/artistshow/:id"} component={ShowArtist} />

    
          <Route path="/" component={Home} />
          <Route>
            <NotFound path="*" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;