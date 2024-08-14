import { Table } from "antd";
import { PlayerData } from "../hooks/usePlayerData";
import { TableColumnsType } from "antd";


const columns : TableColumnsType<PlayerData> = [
    {
      title: 'Player Name',
      dataIndex: 'playerName',
      filterMode: 'menu',
      filterSearch: true,
      sorter: (a, b) => a.playerName.localeCompare( b.playerName),
    },
    {
      title: 'Team Name',
      dataIndex: 'teamNickname',
      sorter: (a, b) => a.teamNickname.localeCompare( b.teamNickname),
    },
    {
        title: 'Stat Type',
        dataIndex: 'statType',
        sorter: (a, b) => a.statType.localeCompare( b.statType),
    },
    {
        title: 'Optimal Line',
        dataIndex: 'line',
        sorter: (a, b) => a.line - b.line,
    },
    {
        title: 'Low Line',
        dataIndex: 'low',
        sorter: (a, b) => a.low - b.low,
    },
    {
        title: 'Position',
        dataIndex: 'position',
        sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
        title: 'High Line',
        dataIndex: 'high',
        sorter: (a, b) => a.high - b.high,
    },
    {
        title: 'Market Status',
        dataIndex: 'suspended',
        sorter: (a, b) => a.suspended.localeCompare(b.suspended),
    },
  ];

  export interface MarketTableProps {
    data : PlayerData[]
  }

export const MarketTable = ({data} : MarketTableProps)=> {
    
    const onChange = () => {
        console.log("click")
      };

      console.log(data)

    return (
        <Table columns={columns} dataSource={data} onChange={onChange} />
    )
}