import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  } from "chart.js";
import './ScoreChart.css'


  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const ScoreChart = ({beachInfo}) => {

  var currentDate1 = new Date();
  var month1 = currentDate1.getMonth();
  var day1 = currentDate1.getDate();

  var currentDate2 = new Date(currentDate1);
  currentDate2.setDate(currentDate1.getDate() + 1);
  var month2 = currentDate2.getMonth();
  var day2 = currentDate2.getDate();

  var currentDate3 = new Date(currentDate2);
  currentDate3.setDate(currentDate2.getDate() + 1);
  var month3 = currentDate3.getMonth();
  var day3 = currentDate3.getDate();


  // Sample data for the chart
  var scoreMap = {
    "매우나쁨" : -2,
    "나쁨" : -1,
    "보통" : 0,
    "좋음" : 1,
    "매우좋음" : 2
  }

  var score = [
    {
        "date" : month1 + 1 + '/' + day1 + ' 오전',
        "res" : beachInfo['day1_am'],
        "value" : scoreMap[beachInfo['day1_am']],
    },
    {
        "date" : month1 + 1 + '/' + day1 + ' 오후',
        "res" : beachInfo['day1_pm'],
        "value" : scoreMap[beachInfo['day1_pm']],
    },
    {
        "date" : month2 + 1 + '/' + day2 + ' 오전',
        "res" : beachInfo['day2_am'],
        "value" : scoreMap[beachInfo['day2_am']],
    },
    {
        "date" : month2 + 1 + '/' + day2 + ' 오후',
        "res" : beachInfo['day2_pm'],
        "value" : scoreMap[beachInfo['day2_pm']],
    },
    {
        "date" : month3 + 1 + '/' + day3 + ' 오전',
        "res" : beachInfo['day3_am'],
        "value" :scoreMap[beachInfo['day3_am']],
    },
    {
        "date" : month3 + 1 + '/' + day3 + ' 오후',
        "res" : beachInfo['day3_pm'],
        "value" :scoreMap[beachInfo['day3_pm']],
    },
];


  const data = {
    labels: score.map(item => item.date),
    datasets: [
      {
        label: '해수욕지수',
        fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지

        data: score.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '차트 제목', // 원하는 제목 입력
        font: {
          weight: 'bold',
          size: 16, // 제목의 글꼴 크기
        },
      },
    },
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
          fontWeight: 'bold',
          fontSize: 12,
        },
      },
      x: {
        type: 'category',
        ticks: {
          fontWeight: 'bold',
          fontSize: 12,
        },
      },
    },
  };

  

  return (
    <div className='ScoreChart' >
      
      <Line data={data} options={options} />
    </div>
  );
};

export default ScoreChart;
