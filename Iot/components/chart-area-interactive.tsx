"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

interface SensorReading {
  createdAt: string
  pressure: number
  temperature: number
  humidity: number
  gauges?: number
}

const chartConfig = {
  pressure: {
    label: "Pressure (kPa)",
    color: "#3b82f6",
  },
  temperature: {
    label: "Temperature (°C)",
    color: "#ef4444",
  },
  humidity: {
    label: "Humidity (%)",
    color: "#22c55e",
  },
  gauges: {
    label: "Gauges",
    color: "#eab308",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [selectedSensor, setSelectedSensor] = React.useState<keyof typeof chartConfig>("pressure")
  const [sensorData, setSensorData] = React.useState<SensorReading[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-data')
        const data = await response.json()
        
      const average = (...values: number[]) =>
  values.reduce((sum, v) => sum + v, 0) / values.length

const formattedData = data
  .filter((entry: any) => entry.timestamp !== "TimeError")
  .map((entry: any) => {
    const pressures = [entry.BME1.pressure, entry.BME2.pressure, entry.BME3.pressure]
    const temps = [entry.BME1.temperature, entry.BME2.temperature, entry.BME3.temperature]
    const humidities = [entry.BME1.humidity, entry.BME2.humidity, entry.BME3.humidity]

    return {
      createdAt: entry.timestamp,
      pressure: average(...pressures),
      temperature: average(...temps),
      humidity: average(...humidities),
      gauges: 0,
    }
  })


        setSensorData(formattedData)
      } catch (error) {
        console.error("Error fetching sensor data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Land Sensor Metrics</CardTitle>
          <CardDescription>Loading sensor data...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Land Sensor Metrics</CardTitle>
        <CardDescription>
          {isMobile ? "Sensor Data" : "Visualize land sensor data in real-time"}
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={selectedSensor}
            onValueChange={(v) => setSelectedSensor(v as keyof typeof chartConfig)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="pressure">Pressure</ToggleGroupItem>
            <ToggleGroupItem value="temperature">Temperature</ToggleGroupItem>
            <ToggleGroupItem value="humidity">Humidity</ToggleGroupItem>
            <ToggleGroupItem value="gauges">Gauges</ToggleGroupItem>
          </ToggleGroup>
          <Select value={selectedSensor} onValueChange={(v) => setSelectedSensor(v as keyof typeof chartConfig)}>
            <SelectTrigger className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden">
              <SelectValue placeholder="Select sensor" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Object.keys(chartConfig).map((key) => (
                <SelectItem key={key} value={key} className="rounded-lg">
                  {chartConfig[key as keyof typeof chartConfig].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={sensorData}>
            <defs>
              {Object.entries(chartConfig).map(([key, config]) => (
                <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  indicator="dashed"
                />
              }
            />
            <Area
              dataKey={selectedSensor}
              type="monotone"
              fill={`url(#fill-${selectedSensor})`}
              stroke={chartConfig[selectedSensor].color}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}