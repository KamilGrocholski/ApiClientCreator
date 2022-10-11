import chalk from 'chalk'
import { TreatAs } from './types/config'
import { Status2xxRange, StatusNot2xxRange } from './types/statusCodeRange'

export type LoggerType = InstanceType<typeof Logger>

type Status = Status2xxRange | StatusNot2xxRange | undefined

interface LoggerConfig {
    clientName: string
}

export class Logger {
    private readonly _config: LoggerConfig
    private readonly _base: string
    private readonly _status: (status: Status) => string

    constructor(config: LoggerConfig) {
        this._config = config

        this._base = `${ config.clientName }: `

        this._status = (status) => {
            if (!status) {
                return `${ ' No status ' }`
            }
            return ` Status ${ status } `
        }
    }

    private _warning(status: Status, msg: string) {
        console.log(chalk.bold(`[${ this._base }${ chalk.bgYellowBright.black(this._status(status)) }]`) + ' ' + chalk.yellow(msg))
    }
    private _error(status: Status, msg: string) {
        // console.log(`[${ this._base }${ chalk.bgMagentaBright.magentaBright(this._status(status)) }] ${ msg }`)
        console.log(chalk.bold(`[${ this._base }${ chalk.bgMagentaBright.black(this._status(status)) }]`) + ' ' + chalk.magenta(msg))
    }
    private _success(status: Status, msg: string) {
        // console.log(`[${ this._base }${ chalk.bgGreenBright.greenBright(this._status(status)) }] ${ msg }`)
        console.log(chalk.bold(`[${ this._base }${ chalk.bgGreenBright.black(this._status(status)) }]`) + ' ' + chalk.green(msg))
    }

    display({ treatAs, status, msg }: { treatAs: TreatAs, status: Status, msg?: string }) {
        switch (treatAs) {
            case 'WARNING': this._warning(status, msg ?? '')
                return
            case 'ERROR': this._error(status, msg ?? '')
                return
            case 'SUCCESS': this._success(status, msg ?? '')
        }
    }
}
