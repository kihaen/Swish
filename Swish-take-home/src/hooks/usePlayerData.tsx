import props from '../../props.json';
import alternates from '../../alternates.json';
import { useMemo, useState, useId } from 'react';

export enum statType {
    'assists',
    'rebounds',
    'points',
    'steals'
}

export type PlayerProp = {
    playerName: string,
    playerId: number,
    teamId: number,
    teamNickname: string,
    teamAbbr: string,
    statType: string
    statTypeId: number,
    position: string,
    marketSuspended: number,
    line: number
}

export type Alternates ={
    playerName: string,
    playerId: number,
    statType: statType,
    statTypeId: number,
    line: number,
    underOdds: number,
    overOdds: number,
    pushOdds: number
}

export interface PlayerData extends PlayerProp {
    low : number, 
    high : number, 
    suspended : string
}


export const usePlayerData = ()=>{
    const [playerProp, setPlayerProp] = useState<Record<string, PlayerProp[]>>({});
    const [alternatesRecord, setAlternatesRecord] = useState<Record<string, Record<statType, Alternates[]>>>({});
    const [formattedPlayerData, setFormattedPlayerData] = useState<PlayerData[]>([])
    const [playerFilter, setPlayerFilter] = useState<string[]>([])

    useMemo(()=>{
        const playerRecords = props.reduce((acc, player)=>{
            if(player.playerName in acc){
                acc[player.playerName].push(player)
            }
            else{
                acc[player.playerName] = [player]
            }
            return acc
        }, {} as Record<string, PlayerProp[]>)
        setPlayerProp(playerRecords)
        setPlayerFilter(Object.keys(playerRecords))
    }, [props])


    useMemo(()=>{
        const alternatesRecord = alternates.sort((a, b) => a.line - b.line).reduce((acc, alternates)=>{
            if(alternates.playerName in acc){
                const player = acc[alternates.playerName]
                acc[alternates.playerName] = {...player, [alternates.statType] : [...player[alternates?.statType as unknown as statType] ?? [], alternates]}
            }
            else{
                acc[alternates.playerName] = {...acc[alternates.playerName] , [alternates.statType] : [alternates]}
            }
            return acc
        }, {} as Record<string, Record<statType, Alternates[]>>)
        setAlternatesRecord(alternatesRecord)
    }, [alternates])

    useMemo(()=>{
        
        const playerFormmated = Object.values(playerProp).flatMap((players, id)=> (
            players.map((player, secondId)=> {
                const alternatePlayer = alternatesRecord[player.playerName]
                const alternatePlayerStat = alternatePlayer[player.statType as unknown as statType]
                const alternateOptimal = alternatePlayerStat?.find((p)=> p.line === player.line)
                const probabilityCheck = alternateOptimal && [alternateOptimal.overOdds, alternateOptimal.pushOdds, alternateOptimal.underOdds].every((value)=>  value < .4
                )
                return ({
                    ...player, 
                    low : alternatePlayerStat?.[0].line, 
                    high : alternatePlayerStat?.[alternatePlayerStat.length-1].line,
                    suspended : (!!player.marketSuspended || !alternateOptimal || probabilityCheck) ? 'Suspended' : 'Open',
                    key : `${id}-${secondId}`
                })}
            ))
        )

        setFormattedPlayerData(playerFormmated as PlayerData[])
 
    }, [playerProp, alternatesRecord])

    const updatePlayer = (player : PlayerData)=>{
        setPlayerProp(prev => {
           const playerRecord =  prev[player.playerName]
           const index = playerRecord.findIndex((market)=> market.statType === player.statType)
           return {
            ...prev,
            [player.playerName] : [...playerRecord.slice(0, index), player, ...playerRecord.slice(index +1, playerRecord.length)]
           } 
        })
    }

    return{
        playerFilter,
        formattedPlayerData,
        updatePlayer
    }
}