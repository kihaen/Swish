import { Table, Checkbox } from "antd";
import { PlayerData } from "../hooks/usePlayerData";
import { TableColumnsType } from "antd";
import * as S from './MarketTable.styles'

  export interface MarketTableProps {
    data : PlayerData[];
    playerFilter : string[];
    updatePlayer : (data : PlayerData)=> void;
  }

export const MarketTable = ({data, playerFilter, updatePlayer} : MarketTableProps)=> {

    const columns : TableColumnsType<PlayerData> = [
        {
          key: 'playerName',
          title: 'Player Name',
          dataIndex: 'playerName',
          filterMode: 'menu',
          filterSearch: true,
          filters: playerFilter.map((player)=> ({ text : player, value : player})),
          onFilter: (value, record) => record.playerName.includes(value as string),
          sorter: (a, b) => a.playerName.localeCompare( b.playerName),
        },
        {
          key: 'teamNickname',
          title: 'Team Name',
          dataIndex: 'teamNickname',
          sorter: (a, b) => a.teamNickname.localeCompare( b.teamNickname),
        },
        {
            key: 'statType',
            title: 'Stat Type',
            dataIndex: 'statType',
            filters : [
                {text : 'Assists', value : 'assists'},
                {text : 'Rebounds', value : 'rebounds'},
                {text : 'Points', value : 'points'},
                {text : 'Steals', value : 'steals'},
            ],
            onFilter: (value, record) => record.statType.includes(value as string),
            sorter: (a, b) => a.statType.localeCompare( b.statType),
        },
        {
            key: 'line',
            title: 'Optimal Line',
            dataIndex: 'line',
            sorter: (a, b) => a.line - b.line,
        },
        {
            key: 'low',
            title: 'Low Line',
            dataIndex: 'low',
            sorter: (a, b) => a.low - b.low,
        },
        {
            key: 'position',
            title: 'Position',
            dataIndex: 'position',
            filterMode: 'menu',
            filters : [
                {text : 'PG', value : 'PG'},
                {text : 'GSW', value : 'GSW'},
                {text : 'SF', value : 'SF'},
                {text : 'SG', value : 'SG'},
                {text : 'PF', value : 'PF'},
                {text : 'C', value : 'C'},
            ],
            onFilter: (value, record) => record.position.includes(value as string),
            sorter: (a, b) => a.position.localeCompare(b.position),
        },
        {
            key : 'high',
            title: 'High Line',
            dataIndex: 'high',
            sorter: (a, b) => a.high - b.high,
        },
        {
            key: 'suspended',
            title: 'Market Status',
            dataIndex: 'suspended',
            filters : [
                {text : 'Open', value : 'Open'},
                {text : 'Suspended', value : 'Suspended'},
            ],
            onFilter: (value, record) => record.suspended.includes(value as string),
            sorter: (a, b) => a.suspended.localeCompare(b.suspended),
            render: (suspendedData, data)=> <S.StyledToggle>{suspendedData}<Checkbox checked={suspendedData === 'Suspended'} onChange={()=> {updatePlayer({...data, marketSuspended : suspendedData === 'Suspended' ? 0 : 1})}} /></S.StyledToggle>
        },
      ];
    
    return (
        <Table columns={columns} dataSource={data}  />
    )
}