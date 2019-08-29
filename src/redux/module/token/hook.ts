import { useCallback } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { BALANCE_OF } from 'src/const'
import { IState as IAllState } from 'src/redux/module'
import { accountSelector } from 'src/redux/module/account'
import {
  entityAction,
  entitySelector,
  entityType,
  entityUtil
} from 'src/redux/module/entity'
import { ITokenManager } from 'src/redux/module/token/type'

export const useTokenManager = () => {
  const mapState = useCallback(
    (state: IAllState) => ({
      accounts: entitySelector.getAccounts(state),
      currentAccount: accountSelector.getCurrentAccount(
        state
      ) as entityType.IAccount
    }),
    []
  )
  const { accounts, currentAccount } = useMappedState(mapState)
  const dispatch = useDispatch()

  const addToken = useCallback<ITokenManager['addToken']>(
    tokenCandidate => {
      const t = entityUtil.createToken({
        accountAddress: currentAccount.address,
        address: tokenCandidate.address,
        decimals: tokenCandidate.decimals,
        name: tokenCandidate.name,
        symbol: tokenCandidate.symbol
      })
      dispatch(entityAction.setToken(t))
      dispatch(
        entityAction.setAccount({
          ...currentAccount,
          tokenAddresses: [...currentAccount.tokenAddresses, t.address]
        })
      )
    },
    [currentAccount]
  )

  const removeToken = useCallback<ITokenManager['removeToken']>(
    token => {
      const a = accounts[token.accountAddress]
      dispatch(
        entityAction.setAccount({
          ...a,
          tokenAddresses: a.tokenAddresses.filter(
            item => item !== token.address
          )
        })
      )
      dispatch(entityAction.removeToken(token.address))
    },
    [accounts]
  )

  const fetchTokenBalance = useCallback<ITokenManager['fetchTokenBalance']>(
    async (token, web3) => {
      const res = await web3.eth.call({
        data: BALANCE_OF + token.accountAddress.slice(2),
        to: token.address
      })
      const balance = parseInt(res, 8).toString()
      dispatch(
        entityAction.setToken({
          ...token,
          balance
        })
      )
    },
    []
  )

  return { addToken, fetchTokenBalance, removeToken }
}
