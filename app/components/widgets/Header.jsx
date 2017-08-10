import React from 'react';
import TimeAgo from 'react-timeago';
import { browserHistory } from 'react-router';
import filter from 'lodash/filter';
import SideMenu from './SideMenu.jsx';
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import GridLayout from './GridLayout.jsx';
import TreeMap from './TreeMap/TreeMap.jsx';
import SimpleLineChart from './Charts/SimpleLineChart.jsx';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import OpenFinNewWindow from '../../components/OpenFinNewWindow.jsx';

import axios from 'axios';
import Constants from '../../utils/Constants.jsx';
import DashboardStore from '../../stores/Dashboard.jsx';
import DashboardActions from '../../actions/Dashboard.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getPropsfromStores();
        this.onChange = this.onChange.bind(this);
    }

    getPropsfromStores() {
        return {
            ...DashboardStore.getState()
        }
    }

    onChange(state) {
        this.setState(state);
    }

    resetNotification() {
        DashboardActions.resetNotification();
    }

    _setRange(e, data) {
        DashboardActions.setRange(data.name, data.value);
    }

    _toggleFrequency(e, data) {
        DashboardActions.toggleFrequency(data.value);
    }

    toggleSettingsModal(toggle) {
        DashboardActions.toggleSettingsPanel(toggle);
    }

    _togglePumpingService(e, data) {
        DashboardActions.togglePumpingService(data.checked);
    }

    _logout() {
        DashboardActions.togglePumpingService(false);
        browserHistory.push('/');
    }

    componentDidMount() {
        DashboardStore.listen(this.onChange);
    }

    componentWillUnmount() {
        DashboardStore.unlisten(this.onChange);
    }

    toggleTheme(e, data) {
        DashboardActions.setTheme(data.value);
    }

    render() {
        let frequencyOptions = [
            {
                text: '5 Seconds',
                value: 5
            },
            {
                text: '15 Seconds',
                value: 15
            },
            {
                text: '30 Seconds',
                value: 30
            },
            {
                text: '45 Seconds',
                value: 45
            }

        ];
        const trigger = (
            <span><Image src="/resources/images/avatar.png" avatar /><span className="name">Howard W. Lutnick</span></span>
        );
        let notifications = this.state.notifications.map(function (notification, index) {
            return (
                <Feed.Event key={'notif' + index}>
                    <Feed.Content>
                        <Feed.Summary>
                            {notification.content}
                            <Feed.Date><TimeAgo live={false} date={notification.createdAt} /></Feed.Date>
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
            )
        });
        if (notifications.length == 0) {
            notifications.push(
                <Feed.Event key={'notif0'}>
                    <Feed.Content>
                        <Feed.Summary>
                            No notifications yet.
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>);
        }
        let unReadNotifications = filter(this.state.notifications, { isRead: false });

        let themes = [{
            key: 'dark',
            value: 'dark',
            text: 'Dark'
        }, {
            key: 'light',
            value: 'light',
            text: 'Light'
        }];

        let styles = {
            themer: {
                marginTop: 15,
                marginLeft: 20
            }
        }

        let logo = this.state.theme == 'light' ? 'logo-dark.png' : 'logo.png';

        var _info;
        var _mainWin, apps = [] ;

        document.addEventListener("DOMContentLoaded", function(){
            _info = document.querySelector('#info');
            init();
        });

        function init(){
            /* Code common to both OpenFin and browser to go above.
             Then the specific code for OpenFin and browser only to be
             targeted in the try/catch block below.
             */
              /* initCommon(); */
            try{
                fin.desktop.main(function(){
                    initWithOpenFin();
                })
            }catch(err){
                initNoOpenFin();
            }
        };


        function initWithOpenFin(){
          // NB it is 'Window' not 'Application' that the EventListener is being attached to
          _mainWin = fin.desktop.Window.getCurrent();

          document.querySelector("#min-btt").addEventListener('click', function(e){
              minAll()
          });

          document.querySelector("#max-btt").addEventListener('click', function(e){
              maxAll();
          });

          _mainWin.addEventListener('close-requested', function(e) {
              var challenge = confirm('are you sure?');
              if (challenge == true) {
                  terminateAllApps();
                  _mainWin.close(true);
              }else{
                  //console.log("The confirm was false")
              }
          });
      //create windows
      // Now here, instead of the Widget names I have used, we could enter any chart type/tree map or Data Grid Chart the application wants to render.
      // Have to work on how to render the widgets corresponding to Data charts and Trees instead of blank Openfin window pages.
          initNewApp("WIDGET 1 - IMMUTABLE GRID").then(function(value){
              var _childWin = value.getWindow()
              _childWin.addEventListener('close-requested', function(e){
                  console.log("close requested, but blocked. Close me from the main app.");
                  _childWin.minimize();
              });
              apps.push(value);
          });
      // widget 2
          initNewApp("WIDGET 2 - INFINITE GRID").then(function(value){
              var _childWin2 = value.getWindow()
              _childWin2.addEventListener('close-requested', function(e){
                  console.log("close requested, but blocked. Close me from the main app.");
                  _childWin2.minimize();
              });
              apps.push(value);
          });

          // widget 3
          initNewApp("WIDGET 3 - POSITION DRILLDOWN").then(function(value){
              var _childWin3 = value.getWindow()
              _childWin3.addEventListener('close-requested', function(e){
                  console.log("close requested, but blocked. Close me from the main app.");
                  _childWin3.minimize();
              });
              apps.push(value);
          });
      }


      function initNoOpenFin(){
      alert("OpenFin is not available - you are probably running in a browser.");
      }

        function terminateAllApps(){
          for(var app in apps ){
              apps[app].terminate();
          }
        }

        function minAll(){
          for(var app in apps ){51
              apps[app].getWindow().minimize();
          }
        }

        function maxAll(){
          for(var app in apps ){
              apps[app].getWindow().restore();
          }
        }


        function initNewApp(uuid){
          return new Promise(function(resolve, reject){
              var volumeMatchApplication = new fin.desktop.Application({
                  name: "BGC IRO Volume Match",
                  uuid: uuid,
                  url: "http://localhost:3030/",
                  mainWindowOptions: {
                      name: "BGC IRO Volume Match",
                      autoShow: true,
                      defaultCentered: true,
                      alwaysOnTop: false,
                      state: "minimized",
                      windowState: "minimized",
                      saveWindowState: false,
                      icon: "favicon.ico"
                  }
              }, function () {
                  // Ensure the Volume Match application is closed when the main application is closed.
                  console.log("running");
                  volumeMatchApplication.run();
                  resolve(volumeMatchApplication)
              });
          })

        }

        return (
            <div>
                  <div id="info">
                  <h3>OpenFin Windows</h3>
                  <button id ="max-btt">OPENFIN</button>
                  <button id ="min-btt">MINIMIZE</button>
                  <div class="content"></div>
                </div>
                <div className={'sub-nav w-clearfix' + this.state.theme}>
                    <a href='#'>
                        <img sizes='(max-width: 479px) 77vw, 110px' src={'/resources/images/' + logo} srcSet={'/resources/images/' + logo + ' 500w'} width='110' />
                    </a>
                    <div className="nav-dropdown right-dropdown" style={styles.themer}>
                        <Dropdown options={themes} pointing className='profile-header-dropdown' value={this.state.theme} onChange={this.toggleTheme.bind(this)}>
                        </Dropdown>
                    </div>
                    <div className="nav-dropdown right-dropdown">
                        <Dropdown trigger={trigger} pointing className='profile-header-dropdown'>
                            <Dropdown.Menu>
                                <Dropdown.Item disabled>
                                    Signed in as <strong>Howard</strong>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item >Your Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={this.toggleSettingsModal.bind(this, true)}>Settings</Dropdown.Item>
                                <Dropdown.Item onClick={this._logout.bind(this)}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>


                    <div className="nav-dropdown right-dropdown notification-container">
                        <Popup className="notification-popup"
                            trigger={<Icon className="notification-icon" onClick={this.resetNotification.bind(this)} link name='alarm outline' size='large' >
                                {this.state.notificationCount ? <Label color='red' floating circular>{unReadNotifications.length}</Label> : null}
                            </Icon>}
                            content={
                                <Feed className="notifications">
                                    {notifications}
                                </Feed>}
                            on='click'
                            position="bottom right"
                            hideOnScroll
                        /></div>

                </div>
                <Modal open={this.state.isSettingModalOpen} onClose={this.toggleSettingsModal.bind(this, false)} size="small" closeIcon className="settings-modal">
                    <Modal.Header>Settings</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Label basic className="freq-label">Toggle Tick Service</Label>
                            <Checkbox toggle defaultChecked={this.state.isServiceActive} onChange={this._togglePumpingService.bind(this)} />
                            <div style={{ margin: '10px 0px' }}>
                                Set Tick Service Frequency to{' '}
                                <Dropdown inline onChange={this._toggleFrequency.bind(this)} options={frequencyOptions} value={this.state.frequency} />
                                <div style={{ margin: '10px 0px' }}>
                                    Tick Range : &nbsp;
                                <Input name="minRange" type="number" step={0.1} defaultValue={this.state.minRange} onChange={this._setRange.bind(this)} min={-1} max={0} /> to:&nbsp;
                                <Input name="maxRange" type="number" step={0.1} defaultValue={this.state.maxRange} onChange={this._setRange.bind(this)} min={0} max={1} />
                                </div>
                            </div>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div >

        );
    }
}
