export const CurrencyValues = {
  EUR: 'EUR',
};

export const RepeatingPeriod = {
  Once: 0,
  EveryMonth: 1,
  EveryTwoMonth: 2,
  EveryThreeMonth: 3,
  EveryFourMonth: 4,
  EveryFiveMonth: 5,
  EverySixMonth: 6,
};

export const RepeatingPeriodForUser = {
  [RepeatingPeriod.Once]: 'Once',
  [RepeatingPeriod.EveryMonth]: 'Every month',
  [RepeatingPeriod.EveryTwoMonth]: 'Every 2 month',
  [RepeatingPeriod.EveryThreeMonth]: 'Every 3 month',
  [RepeatingPeriod.EveryFourMonth]: 'Every 4 month',
  [RepeatingPeriod.EveryFiveMonth]: 'Every 5 month',
  [RepeatingPeriod.EverySixMonth]: 'Every 6 month',
};

export const ConfirmationStates = {
  Agree: 'Agree',
  Cancel: 'Cancel',
};

export const MonthType = {
  Passed: 'Passed',
  Current:'Current',
  Future: 'Future',
}
