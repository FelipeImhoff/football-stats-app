import Chart from 'react-apexcharts'

type Serie = {
  name: string,
  data: {
    x: string | number;
    y: string | number;
    fairOdd?: string;
  }[];
}

type ChartOptions = {
  categories: string[],
  series: Serie[],
  horizontal: boolean
  max?: number
  title: string
}


function BarChart({ categories, series, horizontal, max, title }: ChartOptions) {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal,
      },
    },
    xaxis: {
      categories,
      max,
      labels: {
        style: {
          colors: 'white'
        },
      },
    },
    yaxis: {
      min: 0,
      labels: {
        style: {
          colors: 'white'
        },
      },
    },
    title: {
      text: title,
      style: {
        color: 'white'
      }
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex, dataPointIndex, w }) => {
          const fairOdd = w.config.series[seriesIndex].data[dataPointIndex].fairOdd;
          if(fairOdd){
            return `Percentual: ${value}%<br>Odd justa: ${fairOdd}`;
          }
          return `Total: ${value}`
        },
      },
    },
  }
  return (
    <div className='flex'>
      <Chart options={chartOptions} series={series} type='bar' height={380} width={380} />
    </div>
  )
}

export default BarChart