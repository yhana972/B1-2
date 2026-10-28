import { createClient } from '@supabase/supabase-js'

// VITE_ 환경변수는 브라우저 빌드에 포함됩니다. 실제 값은 .env.local/배포 환경에서 설정합니다.
// publishable key를 사용하고, 데이터 접근 범위는 Supabase의 RLS 정책으로 제어합니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// 같은 클라이언트를 여러 페이지와 Hook에서 import해 재사용합니다.
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
)