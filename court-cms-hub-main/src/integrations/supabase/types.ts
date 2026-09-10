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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      coaches: {
        Row: {
          active: boolean
          biography: string | null
          created_at: string
          id: string
          league_id: string | null
          name: string
          photo_url: string | null
          role: string | null
          team_id: string | null
        }
        Insert: {
          active?: boolean
          biography?: string | null
          created_at?: string
          id?: string
          league_id?: string | null
          name: string
          photo_url?: string | null
          role?: string | null
          team_id?: string | null
        }
        Update: {
          active?: boolean
          biography?: string | null
          created_at?: string
          id?: string
          league_id?: string | null
          name?: string
          photo_url?: string | null
          role?: string | null
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coaches_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coaches_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      content_blocks: {
        Row: {
          block_key: string
          body: string | null
          heading: string | null
          id: string
          image_url: string | null
          page: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          block_key: string
          body?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          page?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          block_key?: string
          body?: string | null
          heading?: string | null
          id?: string
          image_url?: string | null
          page?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          event_date: string
          event_time: string | null
          id: string
          image_url: string | null
          location: string | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          event_date: string
          event_time?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          event_date?: string
          event_time?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      fixtures: {
        Row: {
          competition: string | null
          created_at: string
          home_away: string
          id: string
          league_id: string | null
          match_date: string
          match_time: string | null
          opponent: string
          season_id: string | null
          status: string
          team_id: string | null
          venue: string | null
        }
        Insert: {
          competition?: string | null
          created_at?: string
          home_away?: string
          id?: string
          league_id?: string | null
          match_date: string
          match_time?: string | null
          opponent: string
          season_id?: string | null
          status?: string
          team_id?: string | null
          venue?: string | null
        }
        Update: {
          competition?: string | null
          created_at?: string
          home_away?: string
          id?: string
          league_id?: string | null
          match_date?: string
          match_time?: string | null
          opponent?: string
          season_id?: string | null
          status?: string
          team_id?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fixtures_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixtures_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fixtures_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          alt_text: string | null
          caption: string | null
          category: string
          created_at: string
          featured: boolean
          id: string
          image_url: string
          league_id: string | null
          season_id: string | null
          sort_order: number
          team_id: string | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          category?: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url: string
          league_id?: string | null
          season_id?: string | null
          sort_order?: number
          team_id?: string | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          category?: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string
          league_id?: string | null
          season_id?: string | null
          sort_order?: number
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          gender: string
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          gender: string
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          gender?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          caption: string | null
          category: string | null
          created_at: string
          file_path: string | null
          id: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string
          file_path?: string | null
          id?: string
          url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string
          file_path?: string | null
          id?: string
          url?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          league_id: string | null
          published_at: string
          section: string
          slug: string
          status: string
          team_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          league_id?: string | null
          published_at?: string
          section?: string
          slug: string
          status?: string
          team_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          league_id?: string | null
          published_at?: string
          section?: string
          slug?: string
          status?: string
          team_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "news_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          active: boolean
          biography: string | null
          created_at: string
          date_of_birth: string | null
          gender: string | null
          height: string | null
          id: string
          jersey_number: number | null
          league_id: string | null
          name: string
          photo_url: string | null
          position: string | null
          season_id: string | null
          stats: Json
          team_id: string | null
        }
        Insert: {
          active?: boolean
          biography?: string | null
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          height?: string | null
          id?: string
          jersey_number?: number | null
          league_id?: string | null
          name: string
          photo_url?: string | null
          position?: string | null
          season_id?: string | null
          stats?: Json
          team_id?: string | null
        }
        Update: {
          active?: boolean
          biography?: string | null
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          height?: string | null
          id?: string
          jersey_number?: number | null
          league_id?: string | null
          name?: string
          photo_url?: string | null
          position?: string | null
          season_id?: string | null
          stats?: Json
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "players_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          competition: string | null
          created_at: string
          home_away: string
          id: string
          league_id: string | null
          match_date: string
          opponent: string
          opponent_score: number | null
          our_score: number | null
          report: string | null
          season_id: string | null
          status: string
          team_id: string | null
        }
        Insert: {
          competition?: string | null
          created_at?: string
          home_away?: string
          id?: string
          league_id?: string | null
          match_date: string
          opponent: string
          opponent_score?: number | null
          our_score?: number | null
          report?: string | null
          season_id?: string | null
          status?: string
          team_id?: string | null
        }
        Update: {
          competition?: string | null
          created_at?: string
          home_away?: string
          id?: string
          league_id?: string | null
          match_date?: string
          opponent?: string
          opponent_score?: number | null
          our_score?: number | null
          report?: string | null
          season_id?: string | null
          status?: string
          team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "results_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      seasons: {
        Row: {
          active: boolean
          created_at: string
          end_date: string | null
          id: string
          name: string
          start_date: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          academy_name: string
          address: string | null
          description: string | null
          email: string | null
          facebook_url: string | null
          hero_badge: string | null
          hero_image_url: string | null
          hero_subtitle: string | null
          hero_title: string | null
          id: string
          instagram_url: string | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          map_url: string | null
          phone: string | null
          seo_description: string | null
          seo_title: string | null
          tiktok_url: string | null
          twitter_url: string | null
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          academy_name?: string
          address?: string | null
          description?: string | null
          email?: string | null
          facebook_url?: string | null
          hero_badge?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          instagram_url?: string | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          map_url?: string | null
          phone?: string | null
          seo_description?: string | null
          seo_title?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          academy_name?: string
          address?: string | null
          description?: string | null
          email?: string | null
          facebook_url?: string | null
          hero_badge?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: string
          instagram_url?: string | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          map_url?: string | null
          phone?: string | null
          seo_description?: string | null
          seo_title?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          sort_order: number
          website: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          sort_order?: number
          website?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          sort_order?: number
          website?: string | null
        }
        Relationships: []
      }
      standings: {
        Row: {
          created_at: string
          id: string
          is_academy: boolean
          league_id: string | null
          lost: number
          played: number
          points: number
          points_against: number
          points_for: number
          position: number
          season_id: string | null
          team_name: string
          won: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_academy?: boolean
          league_id?: string | null
          lost?: number
          played?: number
          points?: number
          points_against?: number
          points_for?: number
          position?: number
          season_id?: string | null
          team_name: string
          won?: number
        }
        Update: {
          created_at?: string
          id?: string
          is_academy?: boolean
          league_id?: string | null
          lost?: number
          played?: number
          points?: number
          points_against?: number
          points_for?: number
          position?: number
          season_id?: string | null
          team_name?: string
          won?: number
        }
        Relationships: [
          {
            foreignKeyName: "standings_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "standings_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          gender: string
          id: string
          image_url: string | null
          league_id: string | null
          name: string
          season_id: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          gender: string
          id?: string
          image_url?: string | null
          league_id?: string | null
          name: string
          season_id?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          gender?: string
          id?: string
          image_url?: string | null
          league_id?: string | null
          name?: string
          season_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
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
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin"],
    },
  },
} as const
