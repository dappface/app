import {IState} from 'src/redux/module'

export const getLatestBlockNumber = ({web3}: IState): number =>
  web3.latestBlockNumber
