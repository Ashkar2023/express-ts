import winston, { format } from "winston";

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ message, level, timestamp }) => {
    const paddedLevel = level.padStart(7);
    return `${timestamp} ${paddedLevel}: ${message}`;
});

export const devLogger = winston.createLogger({
    level: "debug",
    format: combine(
        timestamp({ format: "HH:mm:ss" }),
        myFormat
    ),
    // defaultMeta: { service : "user-service"}
    transports: [
        // new winston.transports.File({ filename: 'error.log', level: "error" }),
        new winston.transports.Console(),
    ]
})