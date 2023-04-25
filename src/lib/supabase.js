import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://mafirgephfqwhrdmdpny.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZmlyZ2VwaGZxd2hyZG1kcG55Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MTQ3NTM4MSwiZXhwIjoxOTk3MDUxMzgxfQ.ZGR0HXXeEEwTjEjngBoA48tDA0OoSXaB_U5n38PexZs'
)