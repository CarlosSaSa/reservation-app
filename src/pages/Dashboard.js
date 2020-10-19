import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { CalendarApp } from './calendarView/CalendarApp'

export const Dashboard = () => {

    return (
        <>
            <DashboardLayout />
            <CalendarApp />
        </>
    )
}
