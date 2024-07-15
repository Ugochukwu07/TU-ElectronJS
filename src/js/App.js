import React from 'react'

export default function App(){
    return (
        <>
        <h1>I'm App Component</h1>
        <button onClick={() => {
            electron.notificationApi.sendNotification('My Customer Notification')
        }} >Notify</button>
        </>
    )
}