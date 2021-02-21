import React, { useState, useEffect } from 'react';
import './toast.css';

const Toast: React.FunctionComponent<any> = ({ notificationList, autoDelete = true, dismissTime = 5000 }: 
  {
    notificationList: any[],
    autoDelete: boolean,
    dismissTime: number}
  ) => {

    const [list, setList] = useState(notificationList);

    useEffect(() => {
        setList([...notificationList]);
    }, [notificationList]);

    const deleteToast = React.useCallback((id: number): void => {
      const listItemIndex = list.findIndex(e => e.id === id);
      const toastListItem = notificationList.findIndex(e => e.id === id);
      list.splice(listItemIndex, 1);
      notificationList.splice(toastListItem, 1);
      setList([...list]);
    }, [notificationList, list])

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && notificationList.length && list.length) {
                deleteToast(notificationList[0].id);
            }
        }, dismissTime);
        
        return () => {
            clearInterval(interval);
        }
    }, [notificationList, list, autoDelete, dismissTime, deleteToast]);

    return (
        <>
            <div className={`notification-container position`}>
                {
                    list.map((toast) =>     
                        <div 
                            key={toast.id}
                            className={`notification toast position`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                <toast.icon className="img"/>
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Toast;