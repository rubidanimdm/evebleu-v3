export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          image_url: string | null
          publish_date: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          image_url?: string | null
          publish_date?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          image_url?: string | null
          publish_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          admin_notes: string | null
          booking_date: string
          booking_number: string
          booking_time: string | null
          commission_amount: number | null
          conversation_id: string | null
          created_at: string
          id: string
          party_size: number | null
          special_requests: string | null
          status: string
          supplier_id: string
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          booking_date: string
          booking_number: string
          booking_time?: string | null
          commission_amount?: number | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          party_size?: number | null
          special_requests?: string | null
          status?: string
          supplier_id: string
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          booking_date?: string
          booking_number?: string
          booking_time?: string | null
          commission_amount?: number | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          party_size?: number | null
          special_requests?: string | null
          status?: string
          supplier_id?: string
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      catalog_items: {
        Row: {
          category: string
          created_at: string
          currency: string
          details: Json | null
          id: string
          image_url: string | null
          is_active: boolean
          price: number
          pricing_unit: string
          short_description: string | null
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          currency?: string
          details?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          price?: number
          pricing_unit?: string
          short_description?: string | null
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          currency?: string
          details?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          price?: number
          pricing_unit?: string
          short_description?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          role: string
          sender_id: string | null
          sender_type: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          role: string
          sender_id?: string | null
          sender_type?: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          role?: string
          sender_id?: string | null
          sender_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          display_order: number
          email: string | null
          id: string
          is_emergency: boolean
          name: string
          phone: string
          role: string
          whatsapp_link: string | null
        }
        Insert: {
          display_order?: number
          email?: string | null
          id?: string
          is_emergency?: boolean
          name: string
          phone: string
          role: string
          whatsapp_link?: string | null
        }
        Update: {
          display_order?: number
          email?: string | null
          id?: string
          is_emergency?: boolean
          name?: string
          phone?: string
          role?: string
          whatsapp_link?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          is_archived: boolean
          status: string
          title: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_archived?: boolean
          status?: string
          title?: string | null
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_archived?: boolean
          status?: string
          title?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      customer_notes: {
        Row: {
          admin_id: string
          content: string
          created_at: string
          customer_id: string
          id: string
          updated_at: string
        }
        Insert: {
          admin_id: string
          content: string
          created_at?: string
          customer_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          admin_id?: string
          content?: string
          created_at?: string
          customer_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_url: string | null
          month: string
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          invoice_url?: string | null
          month: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_url?: string | null
          month?: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ai_memories: Json | null
          apartment_unit: string | null
          budget_style: string | null
          building_name: string
          city: string | null
          created_at: string
          dietary_preferences: string[] | null
          email: string
          favorite_cuisines: string[] | null
          full_name: string
          id: string
          language: string | null
          last_seen: string | null
          phone: string
          preferred_areas: string[] | null
          role: Database["public"]["Enums"]["user_role"]
          special_notes: string | null
          updated_at: string
        }
        Insert: {
          ai_memories?: Json | null
          apartment_unit?: string | null
          budget_style?: string | null
          building_name: string
          city?: string | null
          created_at?: string
          dietary_preferences?: string[] | null
          email: string
          favorite_cuisines?: string[] | null
          full_name: string
          id: string
          language?: string | null
          last_seen?: string | null
          phone: string
          preferred_areas?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          special_notes?: string | null
          updated_at?: string
        }
        Update: {
          ai_memories?: Json | null
          apartment_unit?: string | null
          budget_style?: string | null
          building_name?: string
          city?: string | null
          created_at?: string
          dietary_preferences?: string[] | null
          email?: string
          favorite_cuisines?: string[] | null
          full_name?: string
          id?: string
          language?: string | null
          last_seen?: string | null
          phone?: string
          preferred_areas?: string[] | null
          role?: Database["public"]["Enums"]["user_role"]
          special_notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          availability_notes: string | null
          category: string
          commission_percent: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location: string | null
          min_spend: number | null
          name: string
          phone: string | null
          price_range: string | null
          tags: string[] | null
          updated_at: string
          whatsapp_link: string | null
        }
        Insert: {
          availability_notes?: string | null
          category: string
          commission_percent?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          min_spend?: number | null
          name: string
          phone?: string | null
          price_range?: string | null
          tags?: string[] | null
          updated_at?: string
          whatsapp_link?: string | null
        }
        Update: {
          availability_notes?: string | null
          category?: string
          commission_percent?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          min_spend?: number | null
          name?: string
          phone?: string | null
          price_range?: string | null
          tags?: string[] | null
          updated_at?: string
          whatsapp_link?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          apartment_unit: string
          assigned_to: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          created_at: string
          created_by: string
          description: string
          id: string
          manager_notes: string | null
          photo_url: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_number: string
          updated_at: string
        }
        Insert: {
          apartment_unit: string
          assigned_to?: string | null
          category: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_by: string
          description: string
          id?: string
          manager_notes?: string | null
          photo_url?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_number: string
          updated_at?: string
        }
        Update: {
          apartment_unit?: string
          assigned_to?: string | null
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          manager_notes?: string | null
          photo_url?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_number: { Args: never; Returns: string }
      generate_ticket_number: { Args: never; Returns: string }
      is_admin_user: { Args: { user_id: string }; Returns: boolean }
    }
    Enums: {
      payment_status: "paid" | "unpaid"
      ticket_category:
        | "electricity"
        | "water"
        | "elevator"
        | "cleaning"
        | "parking"
        | "other"
      ticket_status: "open" | "in_progress" | "done"
      user_role: "resident" | "manager" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_status: ["paid", "unpaid"],
      ticket_category: [
        "electricity",
        "water",
        "elevator",
        "cleaning",
        "parking",
        "other",
      ],
      ticket_status: ["open", "in_progress", "done"],
      user_role: ["resident", "manager", "staff"],
    },
  },
} as const
