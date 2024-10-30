import {CronJob} from "cron";
import {sendDailyReport} from "./mailService";
import {Parameters} from "../models/parametersModel"

export const cronStart = (parameters: Parameters) => {
    const [hours, minutes] = parameters.executionTime.split(":");
    const cron = new CronJob(`${minutes} ${hours} * * *`, async () => {
        await sendDailyReport();
        console.log(`Reporte diario enviado a las ${parameters.executionTime}`);
    },null, true, 
    );
}