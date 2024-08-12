import {React, Component} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import AboutView from './customComponents/AboutView';
import HomeView from './customComponents/HomeView';
import LoginView from './customComponents/LoginView';
import AdminView from './customComponents/AdminView';
import ManagerView from './customComponents/ManagerView';
import SalesView from './customComponents/SalesView';
import AddRemoveUser from './customComponents/AddRemoveUser';
import AllUsers from './customComponents/AllUsers';
import EditProfile from './customComponents/EditProfile';
import AllProducts from './customComponents/AllProducts';
import AddRemovePart from './customComponents/AddRemovePart';
import EditPart from './customComponents/EditPart';
import ViewAllModels from './customComponents/ViewAllModels';
import AddRemoveModel from './customComponents/AddRemoveModel';
import CheckCompatibility from './customComponents/CheckCompatibility';
import InventoryHistory from './customComponents/InventoryHistory';
import MatchCompatibleInventory from './customComponents/MatchCompatibleInventory';
import Report from './customComponents/Report';
import AllReports from './customComponents/AllReports';
import { API_URL } from './customComponents/utils/config';

const cookies = new Cookies();

export {
    React, Component, axios, toast, ToastContainer, Cookies, cookies, API_URL,
    AboutView, HomeView, LoginView, AdminView, ManagerView, SalesView,
    AddRemoveUser, AllUsers, EditProfile, AllProducts, AddRemovePart, EditPart, ViewAllModels,
    AddRemoveModel, CheckCompatibility, InventoryHistory, MatchCompatibleInventory, Report, AllReports
};