// src/app/dashboard.js
"use client"
import React from "react";
import Profile from "../components/Profile";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Dashboard() {
    const userName = "John Smith"; // Replace with dynamic user data as needed
    const tokensUsed = 60; // Sample data, replace with actual token usage
    const totalTokens = 100; // Sample data, replace with user's total tokens
    const dailyUsageData = [10, 15, 12, 8, 5, 18, 20]; // Replace with actual data

    const progressPercentage = (tokensUsed / totalTokens) * 100;

    const lineChartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Daily Token Usage",
                data: dailyUsageData,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="flex flex-col ml-64 bg-secondary-400 text-white min-h-screen relative">
            <Profile />
            
            <h1 className="text-5xl font-bold  mt-6">Welcome, {userName}</h1>
            
            {/* Progress Bar */}
            <div className="w-full max-w-lg bg-gray-800 rounded-full h-6 mt-10 ml-[30%]">
                <div
                    className="bg-green-500 h-6 rounded-full text-center text-xs font-medium"
                    style={{ width: `${progressPercentage}%` }}
                >
                    {tokensUsed} / {totalTokens} Tokens Used
                </div>
            </div>

            {/* Line Chart */}
            <div className="w-full max-w-lg  mt-10 ml-[30%]">
                <h2 className="text-2xl font-semibold mb-4">Token Usage</h2>
                <Line data={lineChartData} options={{
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: "top" },
                    },
                    scales: {
                        x: { display: true },
                        y: { display: true },
                    },
                }} />
            </div>
        </div>
    );
}
