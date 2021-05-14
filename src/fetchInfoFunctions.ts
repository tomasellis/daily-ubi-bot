import { request} from 'graphql-request'
import axios from 'axios'
import {pohAPI_URL} from './config'

const getMyTokenPrice = async (URL: string, address: string) => {
    try {
        const res = await axios.get(URL)
        return res.data[address]
    } catch (err) {
        console.log(err)
    }
}

const countEmAll = async (skip: number, limit: number): Promise<number> => {
    
    const query =`
        {
            submissions(
                first: ${limit}
                skip: ${skip}
                orderBy: creationTime
                orderDirection: desc
            ) {
                id
            }
        }
    `;

    const response = await request(pohAPI_URL, query)
    
    if(response.submissions.length >= limit) {
        return response.submissions.length + await countEmAll(skip + limit, limit)
    } else {
        return response.submissions.length
    }
}

const countEmFiltered = async (skip: number, limit: number, filter: any): Promise<number> => {
    
    const query =`
        {
            submissions(
                first: ${limit}
                skip: ${skip}
                orderBy: creationTime
                orderDirection: desc
                where: ${filter}
            ) {
                id
            }
        }
    `;

    const response = await request(pohAPI_URL, query)
    
    if(response.submissions.length >= limit) {
        return response.submissions.length + await countEmFiltered(skip + limit, limit, filter)
    } else {
        return response.submissions.length
    }
}

const checkIfSantiParoLaQueue = async (skip: number, limit: number): Promise<string> => {
    
    const query = `
        {
            submission(id:"0x2a52309edf998799c4a8b89324ccad91848c8676"){
            disputed
            vouchees(where:{disputed: true}) {
                id
                status
                name
            } 
            }
        }
    `;

    const response = await request(pohAPI_URL, query)
    
    if(response.submission.disputed === true) {
        return 'Santi metio la pata'
    } else {
        if(response.submission.vouchees.length > 0){
            return `${response.submission.vouchees[0].name} metió la pata`
        }
    }

    if(response.submission.vouchees.length >= limit) {
        return await checkIfSantiParoLaQueue(skip + limit, limit)
    } else {
        return 'Por hoy todo bien'
    }
}

export {
    getMyTokenPrice,
    countEmAll,
    countEmFiltered,
    checkIfSantiParoLaQueue
}