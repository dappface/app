import { IState as IAllState } from 'src/redux/module'

export const getLatestBlockNumber = ({ web3 }: IAllState): number =>
  web3.latestBlockNumber
