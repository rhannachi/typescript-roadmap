/**
 * Enum
 */

// -------- Exemple 1

const ClientRole = {
    Member: 'Member',
    Admin: 'Admin'
} as const

type Enum<T> = T[keyof T];

type User = {
    role: Enum<typeof ClientRole>
}

const user: User = {
    role: 'Member' // 'Admin'
}

console.log({ user })

// -------- Exemple 2

const SIZES_ICON = ['xs', 'sm', 'base', 'lg', 'xl'] as const
type SizeIconType = typeof SIZES_ICON[number]
const size: SizeIconType = 'sm'

console.log({ size })

