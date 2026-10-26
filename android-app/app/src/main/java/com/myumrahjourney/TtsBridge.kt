package com.myumrahjourney

import android.content.Context
import android.speech.tts.TextToSpeech
import android.webkit.JavascriptInterface
import java.util.Locale

/** Gives the web app the phone's own text-to-speech engine (more reliable than the WebView one). */
class TtsBridge(context: Context) : TextToSpeech.OnInitListener {
    private val tts: TextToSpeech = TextToSpeech(context.applicationContext, this)

    @Volatile
    private var ready = false

    override fun onInit(status: Int) {
        ready = status == TextToSpeech.SUCCESS
    }

    /** Returns true when a voice for the language was found and speech started. */
    @JavascriptInterface
    fun speak(text: String, lang: String, rate: Double, pitch: Double): Boolean {
        if (!ready || text.isBlank()) return false
        val wanted = Locale.forLanguageTag(lang)
        var result = tts.setLanguage(wanted)
        if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
            result = tts.setLanguage(Locale(wanted.language))
        }
        if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
            return false
        }
        tts.setSpeechRate(rate.toFloat().coerceIn(0.3f, 2.0f))
        tts.setPitch(pitch.toFloat().coerceIn(0.5f, 2.0f))
        val body = if (text.length > 3500) text.substring(0, 3500) else text
        tts.speak(body, TextToSpeech.QUEUE_FLUSH, null, "u" + System.nanoTime())
        return true
    }

    @JavascriptInterface
    fun stop() {
        if (ready) tts.stop()
    }

    fun shutdown() {
        tts.stop()
        tts.shutdown()
    }
}
