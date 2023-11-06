import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { DynamicItem, Sidebar, dummyData } from "./components";

import './App.css';

export default function App() {
  return (
    <div id="main">
      <Sidebar>
        <Routes>
        <Route path="/" element={<DynamicItem page="dashboard" />} />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<DynamicItem page={item.name} />}
              />
            ))}
        </Routes>
      </Sidebar>
    </div>
  );
}