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
      affiliate_clicks: {
        Row: {
          blog_post_id: string
          clicked_at: string
          id: string
          ip_address: string | null
          referrer: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          blog_post_id: string
          clicked_at?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          blog_post_id?: string
          clicked_at?: string
          id?: string
          ip_address?: string | null
          referrer?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_conversions: {
        Row: {
          blog_post_id: string
          booking_amount: number | null
          booking_id: string | null
          click_id: string | null
          commission_amount: number | null
          commission_rate: number | null
          converted_at: string
          customer_email: string | null
          id: string
          platform: string
          status: string
          webhook_data: Json | null
        }
        Insert: {
          blog_post_id: string
          booking_amount?: number | null
          booking_id?: string | null
          click_id?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          converted_at?: string
          customer_email?: string | null
          id?: string
          platform: string
          status?: string
          webhook_data?: Json | null
        }
        Update: {
          blog_post_id?: string
          booking_amount?: number | null
          booking_id?: string | null
          click_id?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          converted_at?: string
          customer_email?: string | null
          id?: string
          platform?: string
          status?: string
          webhook_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_conversions_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_conversions_click_id_fkey"
            columns: ["click_id"]
            isOneToOne: false
            referencedRelation: "affiliate_clicks"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          affiliate_link: string | null
          affiliate_link_text: string | null
          author_avatar: string | null
          author_name: string
          category: string
          content: Json
          created_at: string
          created_by: string | null
          excerpt: string
          id: string
          image_url: string
          published_at: string | null
          read_time: string | null
          related_dispensary_ids: string[] | null
          related_hotel_ids: string[] | null
          slug: string
          status: string
          subtitle: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          affiliate_link?: string | null
          affiliate_link_text?: string | null
          author_avatar?: string | null
          author_name?: string
          category: string
          content: Json
          created_at?: string
          created_by?: string | null
          excerpt: string
          id?: string
          image_url: string
          published_at?: string | null
          read_time?: string | null
          related_dispensary_ids?: string[] | null
          related_hotel_ids?: string[] | null
          slug: string
          status?: string
          subtitle?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          affiliate_link?: string | null
          affiliate_link_text?: string | null
          author_avatar?: string | null
          author_name?: string
          category?: string
          content?: Json
          created_at?: string
          created_by?: string | null
          excerpt?: string
          id?: string
          image_url?: string
          published_at?: string | null
          read_time?: string | null
          related_dispensary_ids?: string[] | null
          related_hotel_ids?: string[] | null
          slug?: string
          status?: string
          subtitle?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          state_id: string | null
          top_attractions: string[] | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          state_id?: string | null
          top_attractions?: string[] | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          state_id?: string | null
          top_attractions?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          category: string
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          responded_at: string | null
          status: string | null
          subject: string
        }
        Insert: {
          category: string
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          responded_at?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          category?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          responded_at?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          age_limit: number | null
          airport_rules: string | null
          consumption_notes: string | null
          created_at: string | null
          id: string
          image_url: string | null
          last_updated: string | null
          name: string
          penalties: string | null
          possession_limits: string | null
          purchase_limits: string | null
          region: string | null
          slug: string
          source_url: string | null
          status: Database["public"]["Enums"]["legal_status"]
        }
        Insert: {
          age_limit?: number | null
          airport_rules?: string | null
          consumption_notes?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          last_updated?: string | null
          name: string
          penalties?: string | null
          possession_limits?: string | null
          purchase_limits?: string | null
          region?: string | null
          slug: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["legal_status"]
        }
        Update: {
          age_limit?: number | null
          airport_rules?: string | null
          consumption_notes?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          last_updated?: string | null
          name?: string
          penalties?: string | null
          possession_limits?: string | null
          purchase_limits?: string | null
          region?: string | null
          slug?: string
          source_url?: string | null
          status?: Database["public"]["Enums"]["legal_status"]
        }
        Relationships: []
      }
      dispensaries: {
        Row: {
          address: string
          city: string
          country: string | null
          created_at: string | null
          description: string | null
          has_atm: boolean | null
          has_delivery: boolean | null
          has_parking: boolean | null
          hours: string | null
          id: string
          image: string | null
          images: string[] | null
          is_medical: boolean | null
          is_recreational: boolean | null
          latitude: number | null
          license_number: string | null
          longitude: number | null
          name: string
          policy_highlights: string | null
          rating: number | null
          review_count: number | null
          slug: string
          state: string
          status: string | null
          website: string | null
        }
        Insert: {
          address: string
          city: string
          country?: string | null
          created_at?: string | null
          description?: string | null
          has_atm?: boolean | null
          has_delivery?: boolean | null
          has_parking?: boolean | null
          hours?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          is_medical?: boolean | null
          is_recreational?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name: string
          policy_highlights?: string | null
          rating?: number | null
          review_count?: number | null
          slug: string
          state: string
          status?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          city?: string
          country?: string | null
          created_at?: string | null
          description?: string | null
          has_atm?: boolean | null
          has_delivery?: boolean | null
          has_parking?: boolean | null
          hours?: string | null
          id?: string
          image?: string | null
          images?: string[] | null
          is_medical?: boolean | null
          is_recreational?: boolean | null
          latitude?: number | null
          license_number?: string | null
          longitude?: number | null
          name?: string
          policy_highlights?: string | null
          rating?: number | null
          review_count?: number | null
          slug?: string
          state?: string
          status?: string | null
          website?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          dispensary_id: string | null
          hotel_id: string | null
          id: string
          tour_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          dispensary_id?: string | null
          hotel_id?: string | null
          id?: string
          tour_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          dispensary_id?: string | null
          hotel_id?: string | null
          id?: string
          tour_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_dispensary_id_fkey"
            columns: ["dispensary_id"]
            isOneToOne: false
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string | null
          amenities: Json | null
          city_id: string | null
          created_at: string | null
          id: string
          images: string[] | null
          is_420_friendly: boolean | null
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          policies: string | null
          rating: number | null
          slug: string
          website: string | null
        }
        Insert: {
          address?: string | null
          amenities?: Json | null
          city_id?: string | null
          created_at?: string | null
          id?: string
          images?: string[] | null
          is_420_friendly?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          policies?: string | null
          rating?: number | null
          slug: string
          website?: string | null
        }
        Update: {
          address?: string | null
          amenities?: Json | null
          city_id?: string | null
          created_at?: string | null
          id?: string
          images?: string[] | null
          is_420_friendly?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          policies?: string | null
          rating?: number | null
          slug?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotels_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          source_page: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          source_page?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          source_page?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          code: string
          created_at: string | null
          email: string
          expires_at: string
          id: string
          used: boolean | null
        }
        Insert: {
          code: string
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          used?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          used?: boolean | null
        }
        Relationships: []
      }
      products: {
        Row: {
          brand: string | null
          category: string | null
          cbd_percentage: number | null
          created_at: string | null
          description: string | null
          dispensary_id: string
          id: string
          image: string | null
          is_featured: boolean | null
          name: string
          price: number | null
          thc_percentage: number | null
          weight: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          cbd_percentage?: number | null
          created_at?: string | null
          description?: string | null
          dispensary_id: string
          id?: string
          image?: string | null
          is_featured?: boolean | null
          name: string
          price?: number | null
          thc_percentage?: number | null
          weight?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          cbd_percentage?: number | null
          created_at?: string | null
          description?: string | null
          dispensary_id?: string
          id?: string
          image?: string | null
          is_featured?: boolean | null
          name?: string
          price?: number | null
          thc_percentage?: number | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_dispensary_id_fkey"
            columns: ["dispensary_id"]
            isOneToOne: false
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string | null
          dispensary_id: string | null
          id: string
          rating: number | null
          rental_id: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["review_status"]
          title: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          dispensary_id?: string | null
          id?: string
          rating?: number | null
          rental_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          dispensary_id?: string | null
          id?: string
          rating?: number | null
          rental_id?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_dispensary_id_fkey"
            columns: ["dispensary_id"]
            isOneToOne: false
            referencedRelation: "dispensaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_rental_id_fkey"
            columns: ["rental_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      state_law_changelog: {
        Row: {
          changed_by: string
          created_at: string
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
          state_id: string
        }
        Insert: {
          changed_by: string
          created_at?: string
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          state_id: string
        }
        Update: {
          changed_by?: string
          created_at?: string
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          state_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "state_law_changelog_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      states: {
        Row: {
          airport_rules: string | null
          country_id: string | null
          created_at: string | null
          driving_rules: string | null
          id: string
          last_updated: string | null
          name: string
          possession_limits: string | null
          slug: string
          status: Database["public"]["Enums"]["legal_status"]
          tourist_notes: string | null
          where_to_consume: string | null
        }
        Insert: {
          airport_rules?: string | null
          country_id?: string | null
          created_at?: string | null
          driving_rules?: string | null
          id?: string
          last_updated?: string | null
          name: string
          possession_limits?: string | null
          slug: string
          status?: Database["public"]["Enums"]["legal_status"]
          tourist_notes?: string | null
          where_to_consume?: string | null
        }
        Update: {
          airport_rules?: string | null
          country_id?: string | null
          created_at?: string | null
          driving_rules?: string | null
          id?: string
          last_updated?: string | null
          name?: string
          possession_limits?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["legal_status"]
          tourist_notes?: string | null
          where_to_consume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "states_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_reviews: {
        Row: {
          content: string
          created_at: string
          id: string
          rating: number
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["review_status"]
          title: string | null
          tour_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          rating: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          tour_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          rating?: number
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["review_status"]
          title?: string | null
          tour_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_reviews_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          address: string | null
          booking_url: string | null
          city_id: string | null
          created_at: string | null
          description: string | null
          duration: string | null
          highlights: string[] | null
          id: string
          images: string[] | null
          is_420_friendly: boolean | null
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          price_range: string | null
          rating: number | null
          review_count: number | null
          slug: string
          website: string | null
        }
        Insert: {
          address?: string | null
          booking_url?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          highlights?: string[] | null
          id?: string
          images?: string[] | null
          is_420_friendly?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          price_range?: string | null
          rating?: number | null
          review_count?: number | null
          slug: string
          website?: string | null
        }
        Update: {
          address?: string | null
          booking_url?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: string | null
          highlights?: string[] | null
          id?: string
          images?: string[] | null
          is_420_friendly?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          price_range?: string | null
          rating?: number | null
          review_count?: number | null
          slug?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tours_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      legal_status: "illegal" | "decriminalized" | "medical" | "recreational"
      review_status: "pending" | "approved" | "rejected"
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
      app_role: ["admin", "moderator", "user"],
      legal_status: ["illegal", "decriminalized", "medical", "recreational"],
      review_status: ["pending", "approved", "rejected"],
    },
  },
} as const
