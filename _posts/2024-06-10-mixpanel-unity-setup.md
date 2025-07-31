---
layout: post
title: "How to Set Up Mixpanel in Unity Without Losing Your Soul"
date: 2024-06-10 14:30:00
tags: [tutorial]
excerpt: "A practical guide to integrating Mixpanel analytics in Unity, including the critical steps that most tutorials miss and how to avoid common pitfalls."
---

Setting up Mixpanel in Unity should be straightforward, but there are a few critical steps that most tutorials skip—steps that can leave you wondering why your analytics aren't working when they actually are. Here's how to do it right, without losing your sanity.

## Step 1: Install Mixpanel

The first step is installing the Mixpanel SDK in your Unity project. You'll need to add the Mixpanel package to your project through the Package Manager or by importing the SDK files directly.

*[Note: I'll refine this section later to include the detailed installation steps]*

## Step 2: Initialize Mixpanel

This is where things get interesting. You need to configure your project settings with the correct tokens:

1. **Add your project token** in the project settings
2. **Use the same token for both Runtime Token and Debug Token** - this is crucial
3. **Don't forget to click "Show Debug"** - this is the step that most people miss

### The "Show Debug" Trap

If you don't click "Show Debug," you won't see the debug statements in your console. This can be incredibly misleading because Mixpanel is actually working—it's just not showing you the debug output. You might spend hours troubleshooting what you think is a broken integration when it's actually functioning perfectly.

## Step 3: Sending Data

Once initialized, sending data is straightforward:

```csharp
using Mixpanel;

// Basic event tracking
Mixpanel.Track("Player Level Up");

// Event with properties
Mixpanel.Track("Purchase Made", new Dictionary<string, object>
{
    {"item_name", "Golden Sword"},
    {"price", 9.99},
    {"currency", "USD"}
});
```

You can pass a struct or dictionary with keys and values to add context to your events.

## Step 4: Attach Your Script to a GameObject

This is a classic Unity beginner mistake that can leave you scratching your head: **don't forget to attach your script to a GameObject in the scene**.

If your script isn't attached to a GameObject, it simply won't run. You might write perfect Mixpanel integration code, but if the script isn't in the scene, none of your `Mixpanel.Track()` calls will execute.

### How to Attach Your Script

1. Create a new GameObject in your scene (right-click in Hierarchy → Create Empty)
2. Select the GameObject
3. In the Inspector, click "Add Component"
4. Search for your script name and add it
5. Make sure the GameObject is active in the scene

### Common Scenarios

- **Testing in Play Mode**: Your script needs to be on an active GameObject
- **Scene Loading**: If you're loading scenes, ensure your Mixpanel script is on a persistent GameObject or in the new scene
- **Prefabs**: If using prefabs, make sure the script is attached to the prefab instance

This might seem obvious to experienced Unity developers, but it's a surprisingly common oversight that can waste hours of debugging time.

## The 60-Second Flush Rule

Here's the most important thing to understand: **events are only flushed to Mixpanel's servers every 60 seconds by default**.

This means:
- If you're testing in Unity and quickly stopping the game, your events won't appear in Mixpanel immediately
- You need to either wait 60 seconds or manually trigger the flush

### Manual Flushing

To instantly send events to Mixpanel, call:

```csharp
Mixpanel.Flush();
```

This is especially important during development and testing when you want to see your events appear immediately.

## Key Takeaways

The three critical steps that most tutorials miss:

1. **Enable "Show Debug"** - Otherwise you won't see debug statements and might think it's broken
2. **Use the same token for both Runtime and Debug tokens** - This ensures consistency
3. **Remember the 60-second flush rule** - Either call `Mixpanel.Flush()` manually or wait for the automatic flush

## Common Pitfalls

- **Thinking it's broken when it's working**: Check if "Show Debug" is enabled
- **Impatient testing**: Remember that events take up to 60 seconds to appear
- **Different tokens**: Using different tokens for runtime and debug can cause confusion

## Conclusion

Mixpanel in Unity is powerful but has these quirks that can trip you up. Once you understand the debug visibility and flush timing, it becomes much more reliable. The key is patience during testing and making sure you have all the debug options enabled.

Happy tracking! 