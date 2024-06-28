import { repository } from "../shared/repository.js";
import { observation } from "./observations.entity.js";
import { pool } from "../shared/db/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class observationRepository implements repository<observation>{
    public async findAll(): Promise<observation[] | undefined> {
        const [observations] = await pool.query('select * from observations')
        return observations as observation[]
    }

    public async findONe(item:{id: string}): Promise<observation | undefined> {
        const id = Number.parseInt(item.id)
        const [observations] = await pool.query<RowDataPacket[]>('select * from observations where id = ?', [id])
        if(observations.length ===0){
            return undefined
        }
        const observation = observations[0] as observation

        return observation
    }

    public async add(observationInput: observation): Promise<observation | undefined> {
        const {id, name,...observationRow} = observationInput
        const [result] =  await pool.query<ResultSetHeader>('insert into obvservations set ?', [observationRow]) 
        observationInput.id = result.insertId
        return observationInput
    }
 
    public async update(id:string, observationInput: observation): Promise<observation | undefined> {
        const observationId = Number.parseInt(id)
        const {...observationRow} = observationInput
        await pool.query('update observations set ? where id = ?', [observationRow, observationId] )
        return observationInput 
    }
    public async delete(item:{id: string; }): Promise<observation | undefined>{
        try {
        const observationToDelete =await this.findONe(item);
        const observationId = Number.parseInt(item.id)
        await pool.query('delete from observations where id = ?', observationId)
        return observationToDelete;
        } catch (error: any){
            throw new Error('Unable to delete observation')
        }
    }
}