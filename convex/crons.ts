import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"

const crons = cronJobs()
crons.cron("refresh ADP career openings daily", "0 6 * * *", internal.careers.refresh, {})
export default crons
