import React from "react";

import HeaderForm from './components/top-header/header-form';
import Loading from './components/Loading';
import Table from './components/table';
import Toast from './components/toast'

import {useWidgetDataService} from './common/hooks';

import "./App.css";


function App() {

  const {
    notificationList,
    parts, 
    partnames, 
    showNotification,
    status, 
    clearFilter, 
    performFilter, 
    setShowNotification,
    sortWidgetsData,
  } = useWidgetDataService();

  const onAutoSelection = (srch: string): void => {
    srch === '' ? clearFilter() : performFilter(srch);
  }

  return (
    <div className="App">
      {status === 'loading' && <div>
        <Loading 
          message={'establishing connection with the server.....'}/>
        </div>
      }
      {status === 'loaded' && 
        <>
          <HeaderForm data={partnames} onSelect={onAutoSelection}/>
          <Table widgets={parts} sortaction={sortWidgetsData} 
            notificationList={notificationList} 
            notifystatus={showNotification}
          />
          {showNotification && 
            <Toast notificationList={notificationList} 
              notifyState={setShowNotification}
              />
          }
        </>
      }
      {status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  );
}

export default App;
