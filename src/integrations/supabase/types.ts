export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      adoption_requests: {
        Row: {
          created_at: string
          dog_id: string
          experience: string | null
          id: string
          reason: string | null
          request_type: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dog_id: string
          experience?: string | null
          id?: string
          reason?: string | null
          request_type: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dog_id?: string
          experience?: string | null
          id?: string
          reason?: string | null
          request_type?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "adoption_requests_dog_id_fkey"
            columns: ["dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          id: string
          report_id: string
          responded_at: string | null
          response_notes: string | null
          sent_at: string
          status: Database["public"]["Enums"]["alert_status"]
          volunteer_id: string
        }
        Insert: {
          id?: string
          report_id: string
          responded_at?: string | null
          response_notes?: string | null
          sent_at?: string
          status?: Database["public"]["Enums"]["alert_status"]
          volunteer_id: string
        }
        Update: {
          id?: string
          report_id?: string
          responded_at?: string | null
          response_notes?: string | null
          sent_at?: string
          status?: Database["public"]["Enums"]["alert_status"]
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      community_events: {
        Row: {
          created_at: string
          current_participants: number
          description: string | null
          event_date: string
          id: string
          location: string
          max_participants: number | null
          organizer_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_participants?: number
          description?: string | null
          event_date: string
          id?: string
          location: string
          max_participants?: number | null
          organizer_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_participants?: number
          description?: string | null
          event_date?: string
          id?: string
          location?: string
          max_participants?: number | null
          organizer_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      dogs: {
        Row: {
          added_by: string
          age_months: number | null
          breed: string | null
          created_at: string
          description: string | null
          health_status: string | null
          id: string
          image_urls: string[] | null
          is_available_for_adoption: boolean
          is_available_for_fostering: boolean
          location_zone: string | null
          name: string
          updated_at: string
          vaccination_status: string | null
        }
        Insert: {
          added_by: string
          age_months?: number | null
          breed?: string | null
          created_at?: string
          description?: string | null
          health_status?: string | null
          id?: string
          image_urls?: string[] | null
          is_available_for_adoption?: boolean
          is_available_for_fostering?: boolean
          location_zone?: string | null
          name: string
          updated_at?: string
          vaccination_status?: string | null
        }
        Update: {
          added_by?: string
          age_months?: number | null
          breed?: string | null
          created_at?: string
          description?: string | null
          health_status?: string | null
          id?: string
          image_urls?: string[] | null
          is_available_for_adoption?: boolean
          is_available_for_fostering?: boolean
          location_zone?: string | null
          name?: string
          updated_at?: string
          vaccination_status?: string | null
        }
        Relationships: []
      }
      donation_campaigns: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          raised_amount: number
          related_dog_id: string | null
          related_report_id: string | null
          target_amount: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          raised_amount?: number
          related_dog_id?: string | null
          related_report_id?: string | null
          target_amount: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          raised_amount?: number
          related_dog_id?: string | null
          related_report_id?: string | null
          target_amount?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_campaigns_related_dog_id_fkey"
            columns: ["related_dog_id"]
            isOneToOne: false
            referencedRelation: "dogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_campaigns_related_report_id_fkey"
            columns: ["related_report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          campaign_id: string
          created_at: string
          donor_email: string | null
          donor_name: string | null
          id: string
          payment_id: string | null
        }
        Insert: {
          amount: number
          campaign_id: string
          created_at?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          payment_id?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string
          created_at?: string
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          payment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "donation_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      event_participants: {
        Row: {
          attended: boolean | null
          event_id: string
          id: string
          registered_at: string
          user_id: string
        }
        Insert: {
          attended?: boolean | null
          event_id: string
          id?: string
          registered_at?: string
          user_id: string
        }
        Update: {
          attended?: boolean | null
          event_id?: string
          id?: string
          registered_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "community_events"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          latitude: number | null
          longitude: number | null
          phone: string | null
          updated_at: string
          user_id: string
          zone: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          updated_at?: string
          user_id: string
          zone?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          zone?: string | null
        }
        Relationships: []
      }
      report_timeline: {
        Row: {
          action: string
          created_at: string
          id: string
          image_url: string | null
          notes: string | null
          report_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          image_url?: string | null
          notes?: string | null
          report_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          image_url?: string | null
          notes?: string | null
          report_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_timeline_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "reports"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          assigned_volunteer_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          issue_type: Database["public"]["Enums"]["issue_type"]
          latitude: number
          location_address: string | null
          longitude: number
          observed_at: string | null
          resolution_image_url: string | null
          resolution_notes: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["report_status"]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_volunteer_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          issue_type: Database["public"]["Enums"]["issue_type"]
          latitude: number
          location_address?: string | null
          longitude: number
          observed_at?: string | null
          resolution_image_url?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_volunteer_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          issue_type?: Database["public"]["Enums"]["issue_type"]
          latitude?: number
          location_address?: string | null
          longitude?: number
          observed_at?: string | null
          resolution_image_url?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vet_clinics: {
        Row: {
          added_by: string
          address: string
          created_at: string
          id: string
          is_partner: boolean
          latitude: number
          longitude: number
          name: string
          phone: string | null
          services: string[] | null
          updated_at: string
        }
        Insert: {
          added_by: string
          address: string
          created_at?: string
          id?: string
          is_partner?: boolean
          latitude: number
          longitude: number
          name: string
          phone?: string | null
          services?: string[] | null
          updated_at?: string
        }
        Update: {
          added_by?: string
          address?: string
          created_at?: string
          id?: string
          is_partner?: boolean
          latitude?: number
          longitude?: number
          name?: string
          phone?: string | null
          services?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      volunteer_profiles: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          points: number
          role: Database["public"]["Enums"]["volunteer_role"]
          skills: string[] | null
          total_rescues: number
          updated_at: string
          user_id: string
          zone: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          points?: number
          role: Database["public"]["Enums"]["volunteer_role"]
          skills?: string[] | null
          total_rescues?: number
          updated_at?: string
          user_id: string
          zone: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          points?: number
          role?: Database["public"]["Enums"]["volunteer_role"]
          skills?: string[] | null
          total_rescues?: number
          updated_at?: string
          user_id?: string
          zone?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_status: "sent" | "accepted" | "declined" | "expired"
      issue_type:
        | "injured"
        | "lost"
        | "feeding"
        | "aggressive"
        | "puppies"
        | "abuse"
        | "adoption"
        | "other"
      report_status: "pending" | "in_progress" | "resolved" | "closed"
      volunteer_role:
        | "feeder"
        | "rescuer"
        | "foster"
        | "transporter"
        | "vet"
        | "admin"
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
      alert_status: ["sent", "accepted", "declined", "expired"],
      issue_type: [
        "injured",
        "lost",
        "feeding",
        "aggressive",
        "puppies",
        "abuse",
        "adoption",
        "other",
      ],
      report_status: ["pending", "in_progress", "resolved", "closed"],
      volunteer_role: [
        "feeder",
        "rescuer",
        "foster",
        "transporter",
        "vet",
        "admin",
      ],
    },
  },
} as const
