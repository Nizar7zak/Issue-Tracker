import z from 'zod'

export const issueSchema = z.object( {
    title: z.string().min( 1 ).max( 255 ),
    description: z.string().min( 1 ).max( 65535 ),
    status: z.enum( [ 'OPEN', 'CLOSED', 'IN_PROGRESS' ] ).optional(),
} )

export const patchIssueSchema = z.object( {
    title: z.string().min( 1 ).max( 255 ).optional(),
    description: z.string().min( 1 ).max( 65535 ).optional(),
    assignedToUserId: z.string().min( 1, "Assigned to user id is required" ).max( 255 ).optional().nullable(),
    status: z.enum( [ 'OPEN', 'CLOSED', 'IN_PROGRESS' ] ).optional()
} )

export const commentSchema = z.object( {
    content: z.string().min( 1 ).max( 255 ),
} )

export const signInSchema = z.object( {
    email: z.string().email(),
    password: z.string().min( 8 )
} )

export const signUpSchema = z.object( {
    name: z.string().min( 2, "Name must be at least 2 characters" ).max( 50, "Name must be less than 50 characters" ),
    email: z.string().email(),
    password: z.string().min( 8 )
} )

export const authSchema = z.union([signInSchema, signUpSchema])