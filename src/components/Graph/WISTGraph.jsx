import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WISTGraph = ({ testData }) => {
  console.log("WISTDATA", testData); // Log to verify the data structure
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Academic Skills Test Comparisons",
      align: "left",
    },
    xAxis: {
      categories: [
        "Reading Words in Isolation",
        "Spelling",
        "Fundamental Literacy Ability Index",
        "Sound to Symbol Knowledge",
      ],
    },
    yAxis: {
      title: {
        text: "Percentile",
      },
    },
    tooltip: {
      valueSuffix: " percentile",
    },
    plotOptions: {
      series: {
        borderRadius: "25%",
      },
    },
    series: [],
  });

  useEffect(() => {
    if (testData && testData.length > 0) {
      const seriesData = testData.map((test, index) => ({
        type: "column",
        name: `Test ${index + 1}`,
        data: [
          test.word_identification_percentile, // Corrected property name
          test.spelling_percentile, // Corrected property name
          test.fundamental_literacy_percentile, // Corrected property name
          test.sound_symbol_knowledge_percentile, // Corrected property name
        ],
      }));

      const averages = seriesData[0].data.map(
        (_, i) =>
          seriesData.reduce((acc, test) => acc + test.data[i], 0) /
          seriesData.length
      );

      const averageSeries = {
        type: "line",
        step: 'center',
        name: "Average",
        data: averages,
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: "white",
        },
      };

      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [...seriesData, averageSeries],
      }));
    }
  }, [testData]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default WISTGraph;