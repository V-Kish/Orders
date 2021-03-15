package com.orders;

import android.app.Notification;
import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  private static final String CHANNEL_ID = "ghj";

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Orders";
  }

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState, @Nullable PersistableBundle persistentState) {
    super.onCreate(savedInstanceState, persistentState);
    Notification notification = new NotificationCompat.Builder(MainActivity.this, CHANNEL_ID)
            .setContentTitle("New Messages")
            .setContentText("You've received 3 new messages.")
//            .setNumber(2)
            .build();
  }
}
