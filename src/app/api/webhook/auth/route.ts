import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

interface UpdateWebhookPayload {
  type: "user.created" | "user.updated";
  data: {
    id: string;
    primary_email_verified: boolean;
    primary_email: string;
    display_name: string;
    profile_image_url?: string;
    signed_up_at_millis: number;
    oauth_providers: Array<{
      id: string;
      account_id: string;
      email: string;
    }>;
  };
}

interface DeleteWebhookPayload {
  type: "user.deleted";
  data: {
    id: string;
    teams: { id: string }[];
  };
}

type WebhookPayload = UpdateWebhookPayload | DeleteWebhookPayload;

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const payload: WebhookPayload = await request.json();

    console.log(`Webhook received: ${payload.type}`, {
      userId: payload.data.id,
      timestamp: new Date().toISOString(),
    });

    console.log(payload);

    switch (payload.type) {
      case "user.created":
      case "user.updated": {
        const {
          id,
          primary_email: primaryEmail,
          primary_email_verified: primaryEmailVerified,
          display_name: displayName,
          profile_image_url: profileImageUrl,
          signed_up_at_millis: signedUpAtMillis,
          oauth_providers: oauthProviders,
        } = payload.data;

        const signedUpAt = new Date(signedUpAtMillis);

        // For create/update, we'll use upsert to handle both cases
        const user = await prisma.user.upsert({
          where: { id },
          update: {
            primaryEmail,
            primaryEmailVerified,
            displayName,
            profileImageUrl,
            signedUpAt,
            oauthProviders,
          },
          create: {
            id,
            primaryEmail,
            primaryEmailVerified,
            displayName,
            profileImageUrl,
            signedUpAt,
            oauthProviders,
          },
        });

        console.log(`User ${payload.type}:`, {
          userId: user.id,
          email: user.primaryEmail,
          oauthProviders: user.oauthProviders,
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, user }, { status: 200 });
      }

      case "user.deleted": {
        const { id } = payload.data;

        // When deleting a user, their associated jobs will also be deleted
        // due to the relation setup in the schema
        const deletedUser = await prisma.user.delete({
          where: { id },
        });

        console.log("User deleted:", {
          userId: deletedUser.id,
          email: deletedUser.primaryEmail,
          timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
          { success: true, message: "User deleted successfully" },
          { status: 200 }
        );
      }

      default: {
        const unknownPayload = payload as { type: string };
        console.warn("Unknown webhook type:", unknownPayload.type);
        return NextResponse.json(
          { success: false, error: "Unknown webhook type" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Webhook error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
