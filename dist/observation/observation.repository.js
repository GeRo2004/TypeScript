import { pool } from "../shared/db/conn.mysql.js";

export class observationRepository {
    async findAll() {
        const [observations] = await pool.query('select * from observations');
        return observations;
    }
    async findONe(item) {
        const id = Number.parseInt(item.id);
        const [observations] = await pool.query('select * from observations where id = ?', [id]);
        if (observations.length === 0) {
            return undefined;
        }
        const observation = observations[0];
        return observation;
    }
    async add(observationInput) {
        const { id, name, ...observationRow } = observationInput;
        const [result] = await pool.query('insert into observation set ?', [observationRow]);
        observationInput.id = result.insertId;
        return observationInput;
    }
    async update(id, observationInput) {
        const observationId = Number.parseInt(id);
        const { ...observationRow } = observationInput;
        await pool.query('update observation set ? where id = ?', [observationRow, observationId]);
        return observationInput;
    }
    async delete(item) {
        try {
            const observationToDelete = await this.findONe(item);
            const observationId = Number.parseInt(item.id);
            await pool.query('delete from observations where id = ?', observationId);
            return observationToDelete;
        }
        catch (error) {
            throw new Error('Unable to delete observation');
        }
    }
}
//# sourceMappingURL=observation.repository.js.map