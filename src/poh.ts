import { pohAPI_URL } from "./config"
import axios from "axios"

export const howManyHumansRegistered = async (): Promise<number> => {
  const res = await axios({
    url: pohAPI_URL,
    method: "post",
    data: {
      query: `
      query {
        counters {
          registered
          expired
        }
      }`,
    },
  })

  return (
    Number(res.data.data.counters[0].registered) +
    Number(res.data.data.counters[0].expired)
  )
}

// export const countEmAll = async (
//   skip: number,
//   limit: number
// ): Promise<number> => {
//   const res = await axios({
//     url: pohAPI_URL,
//     method: "post",
//     data: {
//       query: `
//             query {
//                 submissions(
//                     first: ${limit}
//                     skip: ${skip}
//                     orderBy: creationTime
//                     orderDirection: desc
//                 ) {
//                     id
//                 }
//               }
//             `,
//     },
//   })

//   console.log("RES ====", res)
//   if (res.data.data.submissions.length >= limit) {
//     return (
//       res.data.data.submissions.length + (await countEmAll(skip + limit, limit))
//     )
//   } else {
//     return res.data.data.submissions.length
//   }
// }

// export const countEmFiltered = async (
//   skip: number,
//   limit: number,
//   filter: any
// ): Promise<number> => {
//   console.log("Params,", "skip", skip, "limit:", limit)
//   const response = await axios({
//     url: pohAPI_URL,
//     method: "post",
//     data: {
//       query: `
//             query {
//                 submissions(
//                     first: ${limit}
//                     skip: ${skip}
//                     orderBy: creationTime
//                     orderDirection: desc
//                     where: ${filter}
//                 ) {
//                     id
//                 }
//               }
//             `,
//     },
//   })

//   if (response.data.data.submissions.length >= limit) {
//     return (
//       response.data.data.submissions.length +
//       (await countEmFiltered(skip + limit, limit, filter))
//     )
//   } else {
//     return response.data.data.submissions.length
//   }
// }

// export const checkIfSantiParoLaQueue = async (
//   skip: number,
//   limit: number
// ): Promise<string> => {
//   const response = await axios({
//     url: pohAPI_URL,
//     method: "post",
//     data: {
//       query: `
//             query {
//                 submission(id:"0x2a52309edf998799c4a8b89324ccad91848c8676"){
//                     disputed
//                     vouchees(where:{disputed: true}) {
//                         id
//                         status
//                         name
//                     }
//                     }
//               }
//             `,
//     },
//   })

//   if (response.data.data.submission.disputed === true) {
//     return "Santi metio la pata"
//   } else {
//     if (response.data.data.submission.vouchees.length > 0) {
//       return `${response.data.data.submission.vouchees[0].name} metió la pata`
//     }
//   }

//   if (response.data.data.submission.vouchees.length >= limit) {
//     return await checkIfSantiParoLaQueue(skip + limit, limit)
//   } else {
//     return "Por hoy todo bien"
//   }
// }
