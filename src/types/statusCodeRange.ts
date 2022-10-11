export type Status2xxRange = StatusCodeRange<200, 300>
export type StatusNot2xxRange = StatusCodeRange<300, 600>

type Enumerate<N extends number, Acc extends number[] = []> 
  = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

type StatusCodeRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
