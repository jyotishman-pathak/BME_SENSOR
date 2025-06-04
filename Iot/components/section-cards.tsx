"use client"

import { useState, useEffect } from "react"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface BMEReading {
  temperature: number
  humidity: number
  pressure: number
}

interface SensorRecord {
  timestamp: string
  BME1: BMEReading
  BME2: BMEReading
  BME3: BMEReading
}

export function SectionCards() {
  const [latestAvg, setLatestAvg] = useState<BMEReading | null>(null)
  const [recordCount, setRecordCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-data")
        const data: SensorRecord[] = await response.json()

        const validData = data.filter((d) => d.timestamp !== "TimeError")

        if (validData.length > 0) {
          const latest = validData[0]

          const avgReading: BMEReading = {
            temperature:
              (latest.BME1.temperature + latest.BME2.temperature + latest.BME3.temperature) / 3,
            humidity:
              (latest.BME1.humidity + latest.BME2.humidity + latest.BME3.humidity) / 3,
            pressure:
              (latest.BME1.pressure + latest.BME2.pressure + latest.BME3.pressure) / 3,
          }

          setLatestAvg(avgReading)
          setLastUpdate(latest.timestamp)
          setRecordCount(validData.length)
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-4 text-muted-foreground">Loading sensor data...</div>
  if (!latestAvg) return <div className="p-4 text-destructive">No valid sensor data available</div>

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pressure</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {latestAvg.pressure.toFixed(1)} kPa
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +2.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Stable reading <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Within expected site limits
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Temperature</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {latestAvg.temperature.toFixed(1)} °C
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -1.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Slight drop <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Check for environmental changes
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Humidity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {latestAvg.humidity.toFixed(1)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Rising levels <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Could affect sensor accuracy
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Readings Analysis</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {recordCount} records
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +{recordCount}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            Data collection <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Last update: {new Date(lastUpdate).toLocaleTimeString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
