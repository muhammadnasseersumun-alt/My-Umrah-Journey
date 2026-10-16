package com.myumrahjourney

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.util.Calendar

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val yearText = findViewById<TextView>(R.id.textYear)
        val currentYear = Calendar.getInstance().get(Calendar.YEAR)
        yearText.text = "© $currentYear My Umrah Journey"
    }
}
