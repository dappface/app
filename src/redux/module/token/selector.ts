import TokenCandidates, { ITokenCandidate } from 'lib/token-list.json'
import { createSelector } from 'reselect'
import { accountSelector } from 'src/redux/module/account'
import { entitySelector, entityType } from 'src/redux/module/entity'

export const getCurrentAccountTokens = createSelector(
  accountSelector.getCurrentAccount,
  entitySelector.getTokens,
  (
    currentAccount: entityType.IAccount | undefined,
    tokens: entityType.ITokens
  ): entityType.IToken[] =>
    currentAccount
      ? currentAccount.tokenAddresses.map(item => tokens[item])
      : []
)

export const getCurrentAccountTokenAddresses = createSelector(
  getCurrentAccountTokens,
  (currentAccountTokens: entityType.IToken[]): string[] =>
    currentAccountTokens.map(item => item.address)
)

export const getTokenCandidates = createSelector(
  getCurrentAccountTokenAddresses,
  (currentAccountTokenAddresses: string[]): ITokenCandidate[] =>
    TokenCandidates.filter(
      item => !currentAccountTokenAddresses.includes(item.address)
    )
)

export const getTokens = createSelector(
  entitySelector.getTokens,
  (tokens: entityType.ITokens): entityType.IToken[] =>
    Object.keys(tokens).map(key => tokens[key])
)
