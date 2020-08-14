import React, {Fragment, useEffect} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchBar from "./Components/Layout/SearchBar";
import Logs from "./Components/Logs/Logs";
import AddBtn from "./Components/Layout/AddBtn";
import AddLogModal from "./Components/Logs/AddLogModal";
import EditLogModal from "./Components/Logs/EditLogModal";
import AddTechModal from "./Components/Techs/AddTechModal";
import TechListModal from "./Components/Techs/TechListModal";
import {Provider} from 'react-redux';
import store from './store';

const App = () => {
    useEffect(() => {
        M.AutoInit();
    })

    return (
        <Provider store={store}>
            <Fragment>
                <SearchBar/>
                <div className='background'>
                    <div className='container'>
                        <AddBtn></AddBtn>
                        <AddLogModal></AddLogModal>
                        <EditLogModal></EditLogModal>
                        <AddTechModal></AddTechModal>
                        <TechListModal></TechListModal>
                        <Logs></Logs>
                    </div>
                </div>
            </Fragment>
        </Provider>
    );
}

export default App;
