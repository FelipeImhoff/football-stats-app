import Chart from 'react-apexcharts'

type Series = {
  label: string,
  value: string,
  fairOdd: string
}

type ChartOptions = {
  series: Series[],
  title: string
}


function DonutChart({ series, title }: ChartOptions) {
  const values = series.map(data => parseFloat(data.value.replace('%', '')))
  const labels = series.map(data => data.label)


  const chartOptions: ApexCharts.ApexOptions = {
    labels,
    legend: {
      show: false
    },
    stroke: {
      show: false
    },
    title: {
      text: title,
      style: {
        color: 'white'
      }
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => {
          const fairOdd = series[seriesIndex].fairOdd;
          return `Percentual: ${value}%<br>Fair Odd: ${fairOdd}`;
        },
      },
    },
  }
  return (
    <div className='flex'>
      <Chart options={chartOptions} series={values} type='donut' height={380} width={380} />
    </div>
  )
}

export default DonutChart