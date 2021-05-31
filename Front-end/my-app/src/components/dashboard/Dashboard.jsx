import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HeaderLoginRegister from '../Header/HeaderLoginRegister'
import ProductsTable from './ProductsTable';

const Dashboard = () => {

    return (
        <div>

            <HeaderLoginRegister/>
            <ProductsTable/>
        </div>
    )
}

export default Dashboard
