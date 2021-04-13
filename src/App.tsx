import React from "react";

import HeaderForm from './components/top-header/header-form';
import Loading from './components/Loading';
import Table from './components/table';
import Toast from './components/toast'

// import {ErrorBoundary, ErrorFallback} from './components/error-boundary';

import {useWidgetDataService} from './common/hooks';

import "./App.css";


const App: React.FunctionComponent<any> = () => {

  const {
    error,
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

  const throwError = (err: Error | unknown) => {
    throw err;
  }

  return (
    <div className="App">
      <HeaderForm data={partnames} onSelect={onAutoSelection}/>
      {/* <Table widgets={parts} sortaction={sortWidgetsData} 
            notificationList={notificationList} 
            notifystatus={showNotification}
          /> */}
      {status === 'loading' && <div>
        <Loading 
          message={'establishing connection with the server.....'}/>
        </div>
      }
      {status === 'loaded' && 
        <>
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
        throwError(error)
      )}
    </div>
  );
}

export default App;
