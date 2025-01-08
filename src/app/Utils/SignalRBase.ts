import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr'
import {v4 as uuidv4} from 'uuid'

export abstract class SignalRBase {
    protected _hubConnection!: HubConnection

    protected constructor(url: string) {
        const hubBuilder: HubConnectionBuilder = new HubConnectionBuilder()
        this._hubConnection = hubBuilder
            .withUrl(url+"?session="+this.get_session_id())
            .withAutomaticReconnect()
            .build()

        this._hubConnection.start().then(r => {
            console.log(`${url}: Connexion SignalR établie`)
            this.refresh()
        })
    }

    abstract refresh(): void

    protected get_session_id(): string {
        let id: string | null = localStorage.getItem("laborevision_session")
        if (id === null) {
            id = uuidv4()
            localStorage.setItem("laborevision_session", id)
        }
        return id
    }
}
