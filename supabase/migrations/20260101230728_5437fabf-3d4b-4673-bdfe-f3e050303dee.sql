-- Step 5: Update profiles RLS - STRICT: users see ONLY their own profile
DROP POLICY IF EXISTS "Admins can view all customer profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Users can ONLY see their own profile
CREATE POLICY "Users can view own profile only"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Managers can view all profiles for customer management
CREATE POLICY "Managers can view all profiles"
ON public.profiles FOR SELECT
USING (public.is_manager(auth.uid()));

CREATE POLICY "Users can create their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Step 6: Update bookings RLS - restrict by role
DROP POLICY IF EXISTS "Admins can manage bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;

-- Users see only their own bookings
CREATE POLICY "Users can view own bookings"
ON public.bookings FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings"
ON public.bookings FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own bookings"
ON public.bookings FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Staff can view bookings (read only)
CREATE POLICY "Staff can view bookings"
ON public.bookings FOR SELECT
USING (public.is_staff(auth.uid()));

-- Managers have full access to bookings
CREATE POLICY "Managers can manage all bookings"
ON public.bookings FOR ALL
USING (public.is_manager(auth.uid()));