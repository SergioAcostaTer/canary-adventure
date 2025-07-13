// strategies/index.ts

import { avatarImageStrategy } from './avatarImageStrategy'
import { placeImageStrategy } from './placeImageStrategy'

export const strategyMap = {
  place: placeImageStrategy,
  avatar: avatarImageStrategy
}

export type StrategyKey = keyof typeof strategyMap

export const getImageStrategy = (key: StrategyKey) => strategyMap[key]
